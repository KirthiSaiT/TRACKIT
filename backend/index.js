import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE"],
    credentials: true
  }
});

// Middleware
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// MongoDB connection
const MONGODB_URI = "mongodb+srv://ADMIN:ADMIN1234@backenddb.pczr0.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB";
mongoose.connect(MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

  //user schema 
  const userSchema = new mongoose.Schema({
    uid: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Hashed password
    createdAt: { type: Date, default: Date.now },
  });
  
  const User = mongoose.model("User", userSchema);
  
  // Register a new user
  app.post("/api/register", async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ message: "User already exists" });
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        uid: crypto.randomUUID(),
        name,
        email,
        password: hashedPassword,
      });
      await newUser.save();
  
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error registering user", error: error.message });
    }
  });
  
  // Login user
  app.post("/api/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: "Invalid email or password" });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });
  
      res.status(200).json({
        message: "Login successful",
        user: { uid: user.uid, name: user.name, email: user.email },
      });
    } catch (error) {
      res.status(500).json({ message: "Error logging in", error: error.message });
    }
  });
  
  
  

// Schemas remain the same
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

// Helper Functions remain the same
const generateToken = () => crypto.randomBytes(16).toString('hex');

const getMarkerType = (index) => {
  const markerTypes = ['default', 'star', 'circle', 'square', 'triangle'];
  return markerTypes[index % markerTypes.length];
};

// Updated API Routes with /api prefix
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

// Socket.io configuration remains the same
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

      io.to(roomId).emit('user-joined', {
        token: token,
        markerType: markerType
      });

      socket.emit('current-users', users[roomId]);

      console.log(`📍 User ${socket.id} joined room ${roomId} with token ${token}`);
    } catch (error) {
      console.error('Error in join-room:', error);
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