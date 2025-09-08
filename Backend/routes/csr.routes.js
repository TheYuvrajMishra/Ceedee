const express = require("express");
const mongoose = require("mongoose");
const { verifyToken, requireAdmin } = require("../middleware/auth");
const { validateCSRProject, validateObjectId, sanitizeInput } = require("../middleware/validation");
const { catchAsync, AppError } = require("../middleware/errorHandler");

const router = express.Router();
const CSR = mongoose.model("CSR");

// GET /api/csr - Public: View CSR projects
router.get("/", catchAsync(async (req, res) => {
  const { page = 1, limit = 10, category, status, location } = req.query;
  
  // Build filter query
  const filter = {};
  if (category) filter.category = category;
  if (status) filter.status = status;
  if (location) filter.location = new RegExp(location, 'i');
  
  // Pagination
  const skip = (page - 1) * limit;
  
  const projects = await CSR.find(filter)
    .sort({ startDate: -1 })
    .skip(skip)
    .limit(parseInt(limit));
    
  const total = await CSR.countDocuments(filter);
  
  res.json({
    status: 'success',
    results: projects.length,
    totalPages: Math.ceil(total / limit),
    currentPage: parseInt(page),
    data: { projects }
  });
}));

// GET /api/csr/:id - Public: Get single CSR project
router.get("/:id", validateObjectId, catchAsync(async (req, res) => {
  const project = await CSR.findById(req.params.id);
  
  if (!project) {
    throw new AppError('CSR project not found', 404, 'CSR_NOT_FOUND');
  }
  
  res.json({
    status: 'success',
    data: { project }
  });
}));

// POST /api/csr - Admin only: Create CSR project
router.post("/", verifyToken, requireAdmin, sanitizeInput, validateCSRProject, catchAsync(async (req, res) => {
  const project = await CSR.create(req.body);
  
  res.status(201).json({
    status: 'success',
    message: 'CSR project created successfully',
    data: { project }
  });
}));

// PUT /api/csr/:id - Admin only: Update CSR project
router.put("/:id", verifyToken, requireAdmin, validateObjectId, sanitizeInput, validateCSRProject, catchAsync(async (req, res) => {
  const project = await CSR.findByIdAndUpdate(
    req.params.id, 
    req.body, 
    { 
      new: true,
      runValidators: true
    }
  );
  
  if (!project) {
    throw new AppError('CSR project not found', 404, 'CSR_NOT_FOUND');
  }
  
  res.json({
    status: 'success',
    message: 'CSR project updated successfully',
    data: { project }
  });
}));

// DELETE /api/csr/:id - Admin only: Delete CSR project
router.delete("/:id", verifyToken, requireAdmin, validateObjectId, catchAsync(async (req, res) => {
  const project = await CSR.findByIdAndDelete(req.params.id);
  
  if (!project) {
    throw new AppError('CSR project not found', 404, 'CSR_NOT_FOUND');
  }
  
  res.json({
    status: 'success',
    message: 'CSR project deleted successfully',
    data: { deletedProject: project }
  });
}));

// GET /api/csr/stats/overview - Admin only: CSR statistics
router.get("/stats/overview", verifyToken, requireAdmin, catchAsync(async (req, res) => {
  const totalProjects = await CSR.countDocuments();
  const activeProjects = await CSR.countDocuments({ status: 'Ongoing' });
  const completedProjects = await CSR.countDocuments({ status: 'Completed' });
  const plannedProjects = await CSR.countDocuments({ status: 'Planned' });
  
  // Get projects by category
  const categoryStats = await CSR.aggregate([
    { $group: { _id: '$category', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);
  
  // Calculate total budget
  const budgetStats = await CSR.aggregate([
    { $group: { _id: null, totalBudget: { $sum: '$budget' } } }
  ]);
  
  res.json({
    status: 'success',
    data: {
      overview: {
        totalProjects,
        activeProjects,
        completedProjects,
        plannedProjects
      },
      categoryBreakdown: categoryStats,
      totalBudget: budgetStats[0]?.totalBudget || 0
    }
  });
}));

module.exports = router;
