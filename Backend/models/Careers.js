const mongoose = require("mongoose");

const CareerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  department: {
    type: String,
    trim: true,
  },
  location: {
    type: String,
    trim: true,
  },
  type: {
    type: String,
    enum: ["Full-Time", "Part-Time", "Internship", "Contract"],
    default: "Full-Time",
  },
  description: {
    type: String,
    required: true,
  },
  requirements: {
    type: [String], // array of requirements
    default: [],
  },
  salaryRange: {
    min: { type: Number },
    max: { type: Number },
  },
}, { timestamps: true });

module.exports = mongoose.model("Career", CareerSchema);
