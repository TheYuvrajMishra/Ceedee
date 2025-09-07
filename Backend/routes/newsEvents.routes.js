const express = require("express");
const mongoose = require("mongoose");
const { verifyToken, requireAdmin } = require("../middleware/auth");
const { validateNewsEvent, validateObjectId, sanitizeInput } = require("../middleware/validation");

const router = express.Router();
const NewsEvent = mongoose.model("NewsEvent");

// ✅ Anyone can READ news & events
router.get("/", async (req, res) => {
  try {
    const items = await NewsEvent.find().sort({ date: -1 });
    res.json(items);
  } catch (err) {
    console.error('Error fetching news/events:', err);
    res.status(500).json({ error: "Failed to fetch news and events" });
  }
});

// ✅ Admin can CREATE
router.post("/", verifyToken, requireAdmin, sanitizeInput, validateNewsEvent, async (req, res) => {
  try {
    const item = await NewsEvent.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    console.error('Error creating news/event:', err);
    res.status(500).json({ error: "Failed to create news/event" });
  }
});

// ✅ Admin can UPDATE
router.put("/:id", verifyToken, requireAdmin, validateObjectId, sanitizeInput, validateNewsEvent, async (req, res) => {
  try {
    const item = await NewsEvent.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ message: "News/Event not found" });
    res.json(item);
  } catch (err) {
    console.error('Error updating news/event:', err);
    res.status(500).json({ error: "Failed to update news/event" });
  }
});

// ✅ Admin can DELETE
router.delete("/:id", verifyToken, requireAdmin, validateObjectId, async (req, res) => {
  try {
    const item = await NewsEvent.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "News/Event not found" });
    res.json({ message: "News/Event deleted successfully" });
  } catch (err) {
    console.error('Error deleting news/event:', err);
    res.status(500).json({ error: "Failed to delete news/event" });
  }
});

module.exports = router;
