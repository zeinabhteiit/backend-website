require("dotenv").config();  // To load environment variables
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 5000;

const userRoutes = require("./routes/userRoutes");

// Use the routes
app.use("/api", userRoutes);
 


const uri = process.env.MONGO_URI;

// Middleware to parse JSON requests
app.use(express.json());

// MongoDB connection
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Atlas connected!"))
.catch((error) => console.error("MongoDB connection error:", error));

// Test route
app.get("/", (req, res) => {
  res.send("Hello, welcome to the back-end!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});