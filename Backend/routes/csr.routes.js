const express = require("express");
const mongoose = require("mongoose");
const { verifyToken, requireAdmin } = require("../middleware/auth");
const { validateCSRProject, validateObjectId, sanitizeInput } = require("../middleware/validation");

const router = express.Router();
const CSR = mongoose.model("CSR");

// ✅ Anyone can READ CSR projects
router.get("/", async (req, res) => {
  try {
    const projects = await CSR.find();
    res.json(projects);
  } catch (err) {
    console.error('Error fetching CSR projects:', err);
    res.status(500).json({ error: "Failed to fetch CSR projects" });
  }
});

// ✅ Admin can CREATE
router.post("/", verifyToken, requireAdmin, sanitizeInput, validateCSRProject, async (req, res) => {
  try {
    const project = await CSR.create(req.body);
    res.status(201).json(project);
  } catch (err) {
    console.error('Error creating CSR project:', err);
    res.status(500).json({ error: "Failed to create CSR project" });
  }
});

// ✅ Admin can UPDATE
router.put("/:id", verifyToken, requireAdmin, validateObjectId, sanitizeInput, validateCSRProject, async (req, res) => {
  try {
    const project = await CSR.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!project) return res.status(404).json({ message: "CSR project not found" });
    res.json(project);
  } catch (err) {
    console.error('Error updating CSR project:', err);
    res.status(500).json({ error: "Failed to update CSR project" });
  }
});

// ✅ Admin can DELETE
router.delete("/:id", verifyToken, requireAdmin, validateObjectId, async (req, res) => {
  try {
    const project = await CSR.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: "CSR project not found" });
    res.json({ message: "CSR project deleted successfully" });
  } catch (err) {
    console.error('Error deleting CSR project:', err);
    res.status(500).json({ error: "Failed to delete CSR project" });
  }
});

module.exports = router;
