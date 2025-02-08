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

import express from 'express';
import mongoose from 'mongoose';
const app = express();

app.listen(3000,()=>{
  console.log("Server is running on port 3000");
});
app.get("/",(req,res)=>{
  res.send("Backend successful");
});


mongoose.connect("mongodb+srv://ADMIN:ADMIN1234@backenddb.pczr0.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB")
.then(()=>{
  console.log("Connected to the database");
})
.catch((err)=>{
  console.log("Error connecting to the database");
})