const express = require("express");
const mongoose = require("mongoose");
const { verifyToken, requireAdmin } = require("../middleware/auth");

const router = express.Router();
const NewsEvent = mongoose.model("NewsEvent");

// ✅ Anyone can READ news & events
router.get("/", async (req, res) => {
  const items = await NewsEvent.find().sort({ date: -1 });
  res.json(items);
});

// ✅ Admin can CREATE
router.post("/", verifyToken, requireAdmin, async (req, res) => {
  const item = await NewsEvent.create(req.body);
  res.status(201).json(item);
});

// ✅ Admin can UPDATE
router.put("/:id", verifyToken, requireAdmin, async (req, res) => {
  const item = await NewsEvent.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) return res.status(404).json({ message: "News/Event not found" });
  res.json(item);
});

// ✅ Admin can DELETE
router.delete("/:id", verifyToken, requireAdmin, async (req, res) => {
  const item = await NewsEvent.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ message: "News/Event not found" });
  res.json({ message: "News/Event deleted successfully" });
});

module.exports = router;
