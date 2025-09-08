const express = require("express");
const mongoose = require("mongoose");
const { verifyToken, requireAdmin } = require("../middleware/auth");
const { validateCareerPosting, validateObjectId, sanitizeInput } = require("../middleware/validation");
const { catchAsync, AppError } = require("../middleware/errorHandler");

const router = express.Router();
const Career = mongoose.model("Career");

// GET /api/careers - Public access to view careers
router.get("/", catchAsync(async (req, res) => {
  const { page = 1, limit = 10, department, type, location } = req.query;
  
  // Build filter query
  const filter = {};
  if (department) filter.department = new RegExp(department, 'i');
  if (type) filter.type = type;
  if (location) filter.location = new RegExp(location, 'i');
  
  // Pagination
  const skip = (page - 1) * limit;
  
  const jobs = await Career.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));
    
  const total = await Career.countDocuments(filter);
  
  res.json({
    status: 'success',
    results: jobs.length,
    totalPages: Math.ceil(total / limit),
    currentPage: parseInt(page),
    data: { jobs }
  });
}));

// GET /api/careers/:id - Get single career
router.get("/:id", validateObjectId, catchAsync(async (req, res) => {
  const job = await Career.findById(req.params.id);
  
  if (!job) {
    throw new AppError('Career posting not found', 404, 'CAREER_NOT_FOUND');
  }
  
  res.json({
    status: 'success',
    data: { job }
  });
}));

// POST /api/careers - Admin only: Create career
router.post("/", verifyToken, requireAdmin, sanitizeInput, validateCareerPosting, catchAsync(async (req, res) => {
  const job = await Career.create(req.body);
  
  res.status(201).json({
    status: 'success',
    message: 'Career posting created successfully',
    data: { job }
  });
}));

// PUT /api/careers/:id - Admin only: Update career
router.put("/:id", verifyToken, requireAdmin, validateObjectId, sanitizeInput, validateCareerPosting, catchAsync(async (req, res) => {
  const job = await Career.findByIdAndUpdate(
    req.params.id, 
    req.body, 
    {
      new: true,
      runValidators: true
    }
  );
  
  if (!job) {
    throw new AppError('Career posting not found', 404, 'CAREER_NOT_FOUND');
  }
  
  res.json({
    status: 'success',
    message: 'Career posting updated successfully',
    data: { job }
  });
}));

// DELETE /api/careers/:id - Admin only: Delete career
router.delete("/:id", verifyToken, requireAdmin, validateObjectId, catchAsync(async (req, res) => {
  const job = await Career.findByIdAndDelete(req.params.id);
  
  if (!job) {
    throw new AppError('Career posting not found', 404, 'CAREER_NOT_FOUND');
  }
  
  res.json({
    status: 'success',
    message: 'Career posting deleted successfully',
    data: { deletedJob: job }
  });
}));

module.exports = router;
