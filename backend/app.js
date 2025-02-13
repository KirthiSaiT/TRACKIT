import express from "express";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url"; // Fix for __dirname in ES module

const __dirname = path.dirname(fileURLToPath(import.meta.url)); // Correctly define `__dirname`

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",  // Allow all origins (modify this for production security)
        methods: ["GET", "POST"]
    }
});

// Socket.io Connection
io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("A user disconnected:", socket.id);
    });
});

// Routes
app.get("/", function (req, res) {
    console.log("Connected");
    res.send("Server is running!");
});

app.get("/api/rooms/:roomId", function (req, res) {
    res.send("Hey, room ID: " + req.params.roomId);
});

// Fix: Set view engine and static folder correctly
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public"))); // Corrected static file serving

// Start Server
server.listen(4000, () => {
    console.log("Server running on http://localhost:4000");
});
