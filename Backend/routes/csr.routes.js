const express = require("express");
const mongoose = require("mongoose");
const { verifyToken, requireAdmin } = require("../middleware/auth");

const router = express.Router();
const CSR = mongoose.model("CSR");

// ✅ Anyone can READ CSR projects
router.get("/", async (req, res) => {
  const projects = await CSR.find();
  res.json(projects);
});

// ✅ Admin can CREATE
router.post("/", verifyToken, requireAdmin, async (req, res) => {
  const project = await CSR.create(req.body);
  res.status(201).json(project);
});

// ✅ Admin can UPDATE
router.put("/:id", verifyToken, requireAdmin, async (req, res) => {
  const project = await CSR.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!project) return res.status(404).json({ message: "CSR project not found" });
  res.json(project);
});

// ✅ Admin can DELETE
router.delete("/:id", verifyToken, requireAdmin, async (req, res) => {
  const project = await CSR.findByIdAndDelete(req.params.id);
  if (!project) return res.status(404).json({ message: "CSR project not found" });
  res.json({ message: "CSR project deleted successfully" });
});

module.exports = router;
