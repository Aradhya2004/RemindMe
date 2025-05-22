import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import reminderRoutes from "./routes/reminderRoutes.js";

dotenv.config();

const app = express();
const path = require('path');
const PORT = process.env.PORT || 5000;

// Serve static files from React build
app.use(express.static(path.join(__dirname, 'build')));

// Fix: For all unmatched routes, serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", reminderRoutes);

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
