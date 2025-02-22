import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  },
});

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// MongoDB connection
const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://ADMIN:ADMIN1234@backenddb.pczr0.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB";

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// Enhanced User Schema
const userSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date },
  loginMethod: { type: String, enum: ['email', 'google'], default: 'email' }
});

const User = mongoose.model("User", userSchema);

// Room Schema remains the same
const roomSchema = new mongoose.Schema({
  adminName: { type: String, required: true },
  roomName: { type: String, required: true },
  adminKey: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

const Room = mongoose.model("Room", roomSchema);

// User Session Schema remains the same
const userSessionSchema = new mongoose.Schema({
  socketId: { type: String, required: true },
  token: { type: String, required: true, unique: true },
  ip: { type: String, required: true },
  roomId: { type: String, required: true },
  lastActive: { type: Date, default: Date.now },
  markerType: { type: String, default: "default" },
  location: {
    latitude: { type: Number },
    longitude: { type: Number },
  },
});

const UserSession = mongoose.model("UserSession", userSessionSchema);

// Enhanced Authentication Routes

// Register a new user
app.post("/api/register", async (req, res) => {
  try {
    const { uid, name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { uid }] 
    });
    
    if (existingUser) {
      // If user exists but was created via Google, just return success
      if (existingUser.loginMethod === 'google') {
        return res.status(200).json({ message: "User already exists via Google login" });
      }
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      uid,
      name,
      email,
      password: hashedPassword,
      loginMethod: uid.includes('google') ? 'google' : 'email',
      lastLogin: new Date()
    });

    await newUser.save();
    res.status(201).json({ 
      message: "User registered successfully",
      user: {
        uid: newUser.uid,
        name: newUser.name,
        email: newUser.email
      }
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ 
      message: "Error registering user", 
      error: error.message 
    });
  }
});

// Login user
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    res.status(200).json({
      message: "Login successful",
      user: {
        uid: user.uid,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ 
      message: "Error logging in", 
      error: error.message 
    });
  }
});

// Room management routes remain the same
app.post("/api/rooms", async (req, res) => {
  try {
    const { adminName, roomName, adminKey } = req.body;
    const room = new Room({ adminName, roomName, adminKey });
    await room.save();
    res.status(201).json({ message: "Room created successfully", room });
  } catch (error) {
    res.status(500).json({ message: "Error creating room", error: error.message });
  }
});

app.get("/api/rooms", async (req, res) => {
  try {
    const rooms = await Room.find().sort({ createdAt: -1 });
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: "Error fetching rooms", error: error.message });
  }
});

app.get("/api/rooms/:adminKey", async (req, res) => {
  try {
    const room = await Room.findOne({ adminKey: req.params.adminKey });
    if (!room) return res.status(404).json({ message: "Room not found" });
    res.json(room);
  } catch (error) {
    res.status(500).json({ message: "Error finding room", error: error.message });
  }
});

app.delete("/api/rooms/:adminKey", async (req, res) => {
  try {
    const { adminKey } = req.params;
    const deletedRoom = await Room.findOneAndDelete({ adminKey });
    if (!deletedRoom) return res.status(404).json({ message: "Room not found" });
    await UserSession.deleteMany({ roomId: adminKey });
    res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting room", error: error.message });
  }
});

// Socket.IO events remain the same
const users = {};

io.on("connection", (socket) => {
  console.log(`✅ User connected: ${socket.id}`);

  socket.on("join-room", async (roomId) => {
    socket.join(roomId);
    if (!users[roomId]) users[roomId] = {};

    const token = crypto.randomBytes(16).toString("hex");
    const markerType = ["default", "star", "circle", "square", "triangle"][
      Object.keys(users[roomId]).length % 5
    ];

    const userSession = new UserSession({
      socketId: socket.id,
      token,
      ip: socket.handshake.address,
      roomId,
      markerType,
    });
    await userSession.save();

    users[roomId][token] = { socketId: socket.id, markerType };
    io.to(roomId).emit("user-joined", { token, markerType });

    console.log(`📍 User ${socket.id} joined room ${roomId} with token ${token}`);
  });

  socket.on("disconnect", async () => {
    console.log(`❌ User disconnected: ${socket.id}`);
    await UserSession.deleteOne({ socketId: socket.id });
  });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));