// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import http from 'http';
// import { Server } from 'socket.io';
// import path from 'path';


// const app = express();

// // Middleware
// const server = http.createServer(app)
// const io = new Server(server, {
//   cors: {
//       origin: "*",
//       methods: ["GET", "POST"]
//   }
// });
// app.use(express.json());
// app.use(cors());

// // MongoDB Atlas Connection String
// const MONGODB_URI = "mongodb+srv://ADMIN:ADMIN1234@backenddb.pczr0.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB";

// // Connect to MongoDB Atlas
// mongoose.connect(MONGODB_URI)
//   .then(() => {
//     console.log("Successfully connected to MongoDB Atlas");
//   })
//   .catch((err) => {
//     console.error("Error connecting to MongoDB Atlas:", err);
//   });

//   //socket server
//   app.set("view engine", "ejs");
//   app.use(express.static(path.join(process.cwd(), "public")));

// // Room Schema
// const roomSchema = new mongoose.Schema({
//   adminName: {
//     type: String,
//     required: true
//   },
//   roomName: {
//     type: String,
//     required: true
//   },
//   adminKey: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// // Create Room Model
// const Room = mongoose.model('Room', roomSchema);

// // Test route
// app.get("/", (req, res) => {
//   res.send("Backend is running successfully");
// });

// // Create a new room
// app.post('/api/rooms', async (req, res) => {
//   try {
//     const { adminName, roomName, adminKey } = req.body;
    
//     // Create new room instance
//     const room = new Room({
//       adminName,
//       roomName,
//       adminKey
//     });
    
//     // Save to MongoDB Atlas
//     const savedRoom = await room.save();
//     console.log("Room saved successfully:", savedRoom);
//     res.status(201).json(savedRoom);
//   } catch (error) {
//     console.error("Error creating room:", error);
//     res.status(500).json({
//        message: "Error creating room",
//        error: error.message
//      });
//   }
// });

// // Get all rooms
// app.get('/api/rooms', async (req, res) => {
//   try {
//     const rooms = await Room.find().sort({ createdAt: -1 });
//     console.log("Fetched rooms successfully");
//     res.json(rooms);
//   } catch (error) {
//     console.error("Error fetching rooms:", error);
//     res.status(500).json({
//        message: "Error fetching rooms",
//        error: error.message
//      });
//   }
// });

// // Get room by admin key
// app.get('/api/rooms/:adminKey', async (req, res) => {
//   try {
//     const room = await Room.findOne({ adminKey: req.params.adminKey });
//     if (!room) {
//       console.log("Room not found with key:", req.params.adminKey);
//       return res.status(404).json({ message: 'Room not found' });
//     }
//     console.log("Room found successfully");
//     res.json(room);
//   } catch (error) {
//     console.error("Error finding room:", error);
//     res.status(500).json({
//        message: "Error finding room",
//        error: error.message
//      });
//   }
// });

// // Delete room
// app.delete('/api/rooms/:adminKey', async (req, res) => {
//   try {
//     const room = await Room.findOneAndDelete({ adminKey: req.params.adminKey });
//     if (!room) {
//       return res.status(404).json({ message: 'Room not found' });
//     }
//     res.json({ message: 'Room deleted successfully' });
//   } catch (error) {
//     res.status(500).json({
//        message: "Error deleting room",
//        error: error.message
//      });
//   }
// });

// const port = 3000;
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(express.json());
app.use(cors());
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// MongoDB Atlas Connection
const MONGODB_URI = "mongodb+srv://ADMIN:ADMIN1234@backenddb.pczr0.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB";

mongoose.connect(MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ Error connecting to MongoDB Atlas:", err));

// Room Schema
const roomSchema = new mongoose.Schema({
  adminName: { type: String, required: true },
  roomName: { type: String, required: true },
  adminKey: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

const Room = mongoose.model('Room', roomSchema);

// Routes
app.get("/", (req, res) => res.send("Backend is running successfully"));

// Create a new room
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

// Get all rooms
app.get('/api/rooms', async (req, res) => {
  try {
    const rooms = await Room.find().sort({ createdAt: -1 });
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: "Error fetching rooms", error: error.message });
  }
});

// Get room by ID
app.get('/api/rooms/:roomId', async (req, res) => {
  try {
    const room = await Room.findById(req.params.roomId);
    if (!room) return res.status(404).json({ message: 'Room not found' });
    res.json(room);
  } catch (error) {
    res.status(500).json({ message: "Error finding room", error: error.message });
  }
});

// Delete room
app.delete('/api/rooms/:roomId', async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.roomId);
    if (!room) return res.status(404).json({ message: 'Room not found' });
    res.json({ message: 'Room deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: "Error deleting room", error: error.message });
  }
});

// Start server
const PORT = 3000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
