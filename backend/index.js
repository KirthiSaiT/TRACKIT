// import express from "express";
// import mongoose from "mongoose";

// const app = express();

// mongoose.connect("mongodb://localhost:27017/data").then(() => {
//   console.log("Connected to MongoDB");
// }).catch((err) => {
//   console.error("MongoDB connection error:", err);
// });

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   age: Number,
//   city: String,
// });

// const UserModel = mongoose.model("users", userSchema);

// app.get("/getUsers", async (req, res) => {
//   try {
//     const users = await UserModel.find({});
//     res.json(users);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// app.get("/", (req, res) => {
//   res.send("Server is running successfully");
// });

// const port = process.env.PORT || 3000;

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// }).on("error", (err) => {
//   if (err.code === "EADDRINUSE") {
//     console.error(`Port ${port} is already in use. Try using a different port.`);
//     process.exit(1);
//   } else {
//     console.error("Server error:", err);
//   }
// });
//this is 2nd
// import express from 'express';
// import mongoose from 'mongoose';
// const app = express();

// app.listen(3000,()=>{
//   console.log("Server is running on port 3000");
// });
// app.get("/",(req,res)=>{
//   res.send("Backend successful");
// });


// mongoose.connect("mongodb+srv://ADMIN:ADMIN1234@backenddb.pczr0.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB")
// .then(()=>{
//   console.log("Connected to the database");
// })
// .catch((err)=>{
//   console.log("Error connecting to the database");
// })
// this is 3rd 
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Atlas Connection String
const MONGODB_URI = "mongodb+srv://ADMIN:ADMIN1234@backenddb.pczr0.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB";

// Connect to MongoDB Atlas
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log("Successfully connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB Atlas:", err);
  });

// Room Schema
const roomSchema = new mongoose.Schema({
  adminName: {
    type: String,
    required: true
  },
  roomName: {
    type: String,
    required: true
  },
  adminKey: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create Room Model
const Room = mongoose.model('Room', roomSchema);

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running successfully");
});

// Create a new room
app.post('/api/rooms', async (req, res) => {
  try {
    const { adminName, roomName, adminKey } = req.body;
    
    // Create new room instance
    const room = new Room({
      adminName,
      roomName,
      adminKey
    });
    
    // Save to MongoDB Atlas
    const savedRoom = await room.save();
    console.log("Room saved successfully:", savedRoom);
    res.status(201).json(savedRoom);
  } catch (error) {
    console.error("Error creating room:", error);
    res.status(500).json({ 
      message: "Error creating room", 
      error: error.message 
    });
  }
});

// Get all rooms
app.get('/api/rooms', async (req, res) => {
  try {
    const rooms = await Room.find().sort({ createdAt: -1 });
    console.log("Fetched rooms successfully");
    res.json(rooms);
  } catch (error) {
    console.error("Error fetching rooms:", error);
    res.status(500).json({ 
      message: "Error fetching rooms", 
      error: error.message 
    });
  }
});

// Get room by admin key
app.get('/api/rooms/:adminKey', async (req, res) => {
  try {
    const room = await Room.findOne({ adminKey: req.params.adminKey });
    if (!room) {
      console.log("Room not found with key:", req.params.adminKey);
      return res.status(404).json({ message: 'Room not found' });
    }
    console.log("Room found successfully");
    res.json(room);
  } catch (error) {
    console.error("Error finding room:", error);
    res.status(500).json({ 
      message: "Error finding room", 
      error: error.message 
    });
  }
});

// Delete room
app.delete('/api/rooms/:adminKey', async (req, res) => {
  try {
    const room = await Room.findOneAndDelete({ adminKey: req.params.adminKey });
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.json({ message: 'Room deleted successfully' });
  } catch (error) {
    res.status(500).json({ 
      message: "Error deleting room", 
      error: error.message 
    });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});