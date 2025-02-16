const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  image: {
    type: String, // Store only the filename (not full path)
    required: true,
  },
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;