const express = require("express");
const mongoose = require("mongoose");
const { verifyToken, requireAdmin } = require("../middleware/auth");

const router = express.Router();
const Career = mongoose.model("Career");

router.get("/", async (req, res) => {
  const jobs = await Career.find();
  res.json(jobs);
});

router.post("/", verifyToken, requireAdmin, async (req, res) => {
  const job = await Career.create(req.body);
  res.status(201).json(job);
});

router.put("/:id", verifyToken, requireAdmin, async (req, res) => {
  const job = await Career.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(job);
});

router.delete("/:id", verifyToken, requireAdmin, async (req, res) => {
  await Career.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
});

module.exports = router;
