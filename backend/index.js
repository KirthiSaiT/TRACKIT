import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import dotenv from 'dotenv';
import twilio from 'twilio';

// Initialize environment variables
dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "DELETE"],
  },
});

// Initialize Twilio client
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
const MONGODB_URI = "mongodb+srv://ADMIN:ADMIN1234@backenddb.pczr0.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB";
mongoose.connect(MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// Schemas
const roomSchema = new mongoose.Schema({
  adminName: { type: String, required: true },
  roomName: { type: String, required: true },
  adminKey: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

const userSessionSchema = new mongoose.Schema({
  socketId: { type: String, required: true },
  token: { type: String, required: true, unique: true },
  ip: { type: String, required: true },
  roomId: { type: String, required: true },
  lastActive: { type: Date, default: Date.now },
  markerType: { type: String, default: 'default' },
  location: {
    latitude: { type: Number },
    longitude: { type: Number }
  }
});

const Room = mongoose.model('Room', roomSchema);
const UserSession = mongoose.model('UserSession', userSessionSchema);

// Helper Functions
const generateToken = () => crypto.randomBytes(16).toString('hex');

const getMarkerType = (index) => {
  const markerTypes = ['default', 'star', 'circle', 'square', 'triangle'];
  return markerTypes[index % markerTypes.length];
};

// Emergency Alert Function
const sendEmergencyAlerts = async (location) => {
  const emergencyMessage = `🚨 Emergency Alert! Location: ${location.latitude}, ${location.longitude}. Please take immediate action.`;
  const phoneNumbers = ['+919123587980', '+919952941725'];

  try {
    const results = [];
    for (const to of phoneNumbers) {
      try {
        const smsResponse = await twilioClient.messages.create({
          body: emergencyMessage,
          from: process.env.TWILIO_PHONE_NUMBER,
          to
        });
        results.push({ type: "SMS", to, sid: smsResponse.sid });
      } catch (error) {
        console.error('SMS Error:', error);
        results.push({ type: "SMS", to, error: error.message });
      }

      try {
        const whatsappFrom = process.env.TWILIO_WHATSAPP_NUMBER.startsWith('whatsapp:') 
          ? process.env.TWILIO_WHATSAPP_NUMBER 
          : `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`;
        const whatsappTo = to.startsWith('whatsapp:') ? to : `whatsapp:${to}`;
        
        const whatsappResponse = await twilioClient.messages.create({
          body: emergencyMessage,
          from: whatsappFrom,
          to: whatsappTo
        });
        results.push({ type: "WhatsApp", to, sid: whatsappResponse.sid });
      } catch (error) {
        console.error('WhatsApp Error:', error);
        results.push({ type: "WhatsApp", to, error: error.message });
      }

      try {
        const callResponse = await twilioClient.calls.create({
          twiml: `<Response><Say>${emergencyMessage}</Say></Response>`,
          from: process.env.TWILIO_PHONE_NUMBER,
          to
        });
        results.push({ type: "Call", to, sid: callResponse.sid });
      } catch (error) {
        console.error('Call Error:', error);
        results.push({ type: "Call", to, error: error.message });
      }
    }

    const hasSuccessfulCommunication = results.some(result => result.sid);
    if (!hasSuccessfulCommunication) {
      throw new Error('All communication methods failed');
    }

    return { success: true, results };
  } catch (error) {
    console.error('Emergency Alert Error:', error);
    return { success: false, error: error.message, details: results };
  }
};

// API Routes
app.post('/api/rooms', async (req, res) => {
  try {
    const { adminName, roomName, adminKey } = req.body;
    const room = new Room({ adminName, roomName, adminKey });
    const savedRoom = await room.save();
    res.status(201).json(savedRoom);
  } catch (error) {
    res.status(500).json({ message: "Error creating room", error: error.message });
  }
});

app.get('/api/rooms', async (req, res) => {
  try {
    const rooms = await Room.find().sort({ createdAt: -1 });
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: "Error fetching rooms", error: error.message });
  }
});

app.get('/api/rooms/:adminKey', async (req, res) => {
  try {
    const room = await Room.findOne({ adminKey: req.params.adminKey });
    if (!room) return res.status(404).json({ message: 'Room not found' });
    res.json(room);
  } catch (error) {
    res.status(500).json({ message: "Error finding room", error: error.message });
  }
});

app.delete('/api/rooms/:adminKey', async (req, res) => {
  try {
    const { adminKey } = req.params;
    const deletedRoom = await Room.findOneAndDelete({ adminKey });
    if (!deletedRoom) return res.status(404).json({ message: 'Room not found' });
    
    await UserSession.deleteMany({ roomId: adminKey });
    res.status(200).json({ message: 'Room deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting room', error: error.message });
  }
});

// Emergency Alert Endpoint
app.post('/send-alert', async (req, res) => {
  try {
    const { location } = req.body;
    const alertResult = await sendEmergencyAlerts(location);
    if (alertResult.success) {
      res.status(200).json({ success: true, message: "Alerts sent successfully!", results: alertResult.results });
    } else {
      res.status(500).json({ success: false, error: alertResult.error });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Socket.io Real-time tracking
const users = {};

io.on('connection', async (socket) => {
  console.log(`✅ User connected: ${socket.id}`);
  
  const clientIp = socket.handshake.headers['x-forwarded-for'] || socket.handshake.address;
  
  socket.on('join-room', async (roomId) => {
    try {
      socket.join(roomId);
      if (!users[roomId]) users[roomId] = {};
      
      const token = generateToken();
      const userCount = Object.keys(users[roomId]).length;
      const markerType = getMarkerType(userCount);
      
      const userSession = new UserSession({
        socketId: socket.id,
        token: token,
        ip: clientIp,
        roomId: roomId,
        markerType: markerType
      });
      await userSession.save();
      
      users[roomId][token] = {
        socketId: socket.id,
        latitude: null,
        longitude: null,
        markerType: markerType
      };
      
      // Broadcast the new user's info to everyone in the room, including themselves
      io.to(roomId).emit('user-joined', {
        token: token,
        markerType: markerType
      });
      
      // Send the current state of all users in the room to the new user
      socket.emit('current-users', users[roomId]);
      
      console.log(`📍 User ${socket.id} joined room ${roomId} with token ${token}`);
    } catch (error) {
      console.error('Error in join-room:', error);
    }
  });

  socket.on('send-location', async ({ latitude, longitude, roomId, token }) => {
    try {
      if (users[roomId] && users[roomId][token]) {
        users[roomId][token].latitude = latitude;
        users[roomId][token].longitude = longitude;
        
        await UserSession.findOneAndUpdate(
          { token: token },
          { 
            'location.latitude': latitude,
            'location.longitude': longitude,
            lastActive: new Date()
          }
        );
        
        // Broadcast the location update to ALL users in the room
        io.to(roomId).emit('receive-location', {
          token: token,
          latitude,
          longitude,
          markerType: users[roomId][token].markerType
        });
      }
    } catch (error) {
      console.error('Error in send-location:', error);
    }
  });

  socket.on('emergency-signal', async ({ latitude, longitude, roomId, token }) => {
    try {
      const alertResult = await sendEmergencyAlerts({ latitude, longitude });
      socket.emit('emergency-response', alertResult);
      
      // Broadcast emergency to all users in the room
      io.to(roomId).emit('emergency-broadcast', {
        token: token,
        location: { latitude, longitude },
        timestamp: new Date()
      });
    } catch (error) {
      console.error('Error in emergency-signal:', error);
      socket.emit('emergency-response', { success: false, error: error.message });
    }
  });

  socket.on('disconnect', async () => {
    console.log(`❌ User disconnected: ${socket.id}`);
    try {
      const userSession = await UserSession.findOne({ socketId: socket.id });
      if (userSession) {
        const { roomId, token } = userSession;
        if (users[roomId] && users[roomId][token]) {
          delete users[roomId][token];
          // Notify all users in the room that this user disconnected
          io.to(roomId).emit('user-disconnected', token);
          await UserSession.deleteOne({ socketId: socket.id });
        }
      }
    } catch (error) {
      console.error('Error in disconnect:', error);
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));