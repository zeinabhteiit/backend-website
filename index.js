require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes"); // Add this

const app = express();
const port = 5001; //changed from 5000 5o 5001

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve images

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Use routes
app.use("/api", userRoutes);
app.use("/api", projectRoutes); // Add this

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port} `);
});

app.get("/", (req, res) => {
  res.send('welcome to the backend, server is running!');
});