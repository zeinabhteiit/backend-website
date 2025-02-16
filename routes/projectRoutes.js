const express = require("express");
const multer = require("multer");
const path = require("path");
const Project = require("../models/project"); // Import Project model

const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: "./uploads/", // Save files in the "uploads" folder
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage: storage });

// Create a new project (with image upload)
router.post("/projects", upload.single("image"), async (req, res) => {
  try {
    const { title, location } = req.body;
    const image = req.file.filename; // Get filename of uploaded image

    const newProject = new Project({ title, location, image });
    await newProject.save();

    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ message: "Error creating project", error });
  }
});

// Get all projects
router.get("/projects", async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error fetching projects", error });
  }
});

module.exports = router;