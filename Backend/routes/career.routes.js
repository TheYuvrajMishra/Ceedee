const express = require("express");
const mongoose = require("mongoose");
const { verifyToken, requireAdmin } = require("../middleware/auth");
const { validateCareerPosting, validateObjectId, sanitizeInput } = require("../middleware/validation");

const router = express.Router();
const Career = mongoose.model("Career");

router.get("/", async (req, res) => {
  try {
    const jobs = await Career.find();
    res.json(jobs);
  } catch (err) {
    console.error('Error fetching careers:', err);
    res.status(500).json({ error: "Failed to fetch careers" });
  }
});

router.post("/", verifyToken, requireAdmin, sanitizeInput, validateCareerPosting, async (req, res) => {
  try {
    const job = await Career.create(req.body);
    res.status(201).json(job);
  } catch (err) {
    console.error('Error creating career:', err);
    res.status(500).json({ error: "Failed to create career posting" });
  }
});

router.put("/:id", verifyToken, requireAdmin, validateObjectId, sanitizeInput, validateCareerPosting, async (req, res) => {
  try {
    const job = await Career.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!job) {
      return res.status(404).json({ error: "Career posting not found" });
    }
    res.json(job);
  } catch (err) {
    console.error('Error updating career:', err);
    res.status(500).json({ error: "Failed to update career posting" });
  }
});

router.delete("/:id", verifyToken, requireAdmin, validateObjectId, async (req, res) => {
  try {
    const job = await Career.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).json({ error: "Career posting not found" });
    }
    res.json({ message: "Career posting deleted successfully" });
  } catch (err) {
    console.error('Error deleting career:', err);
    res.status(500).json({ error: "Failed to delete career posting" });
  }
});

module.exports = router;
