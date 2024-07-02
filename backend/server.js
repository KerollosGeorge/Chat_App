import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import cookieParser from "cookie-parser";
import { app, server } from "./socket/socket.js";

//routes
import authRoutes from "./routes/auth.js";
import messageRoutes from "./routes/message.js";
import userRoutes from "./routes/user.js";

const __dirname = path.resolve();

dotenv.config();

//if database is disconnected
mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected.");
});

//middlewares
app.use(express.json());
app.use(cookieParser());

//routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Chat APIs");
});
app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

const PORT = process.env.PORT || 8000;
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to DB");
    server.listen(PORT, () => {
      console.log(`server Running on Port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
