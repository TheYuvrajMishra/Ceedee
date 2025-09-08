// routes/client.routes.js
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { verifyToken, requireAdmin } = require("../middleware/auth");
const { validateClientInquiry, sanitizeInput, validateObjectId } = require("../middleware/validation");
const { catchAsync, AppError } = require("../middleware/errorHandler");

const Client = mongoose.model("Client");

// POST /api/clients - Public: Submit client inquiry
router.post("/", sanitizeInput, validateClientInquiry, catchAsync(async (req, res) => {
  const newClient = await Client.create(req.body);
  
  res.status(201).json({
    status: 'success',
    message: "Client inquiry submitted successfully",
    data: { inquiry: newClient }
  });
}));

// GET /api/clients - Admin only: View all client inquiries
router.get("/", verifyToken, requireAdmin, catchAsync(async (req, res) => {
  const { page = 1, limit = 10, status, sortBy = 'createdAt' } = req.query;
  
  // Build filter
  const filter = {};
  if (status) filter.status = status;
  
  // Pagination
  const skip = (page - 1) * limit;
  
  const clients = await Client.find(filter)
    .sort({ [sortBy]: -1 })
    .skip(skip)
    .limit(parseInt(limit));
    
  const total = await Client.countDocuments(filter);
  
  res.json({
    status: 'success',
    results: clients.length,
    totalPages: Math.ceil(total / limit),
    currentPage: parseInt(page),
    data: { inquiries: clients }
  });
}));

// GET /api/clients/:id - Admin only: Get single client inquiry
router.get("/:id", verifyToken, requireAdmin, validateObjectId, catchAsync(async (req, res) => {
  const client = await Client.findById(req.params.id);
  
  if (!client) {
    throw new AppError('Client inquiry not found', 404, 'CLIENT_NOT_FOUND');
  }
  
  res.json({
    status: 'success',
    data: { inquiry: client }
  });
}));

// PUT /api/clients/:id - Admin only: Update client inquiry status
router.put("/:id", verifyToken, requireAdmin, validateObjectId, sanitizeInput, catchAsync(async (req, res) => {
  const allowedUpdates = ['status', 'notes', 'assignedTo'];
  const updates = {};
  
  // Only allow specific fields to be updated
  Object.keys(req.body).forEach(key => {
    if (allowedUpdates.includes(key)) {
      updates[key] = req.body[key];
    }
  });
  
  const client = await Client.findByIdAndUpdate(
    req.params.id,
    updates,
    {
      new: true,
      runValidators: true
    }
  );
  
  if (!client) {
    throw new AppError('Client inquiry not found', 404, 'CLIENT_NOT_FOUND');
  }
  
  res.json({
    status: 'success',
    message: 'Client inquiry updated successfully',
    data: { inquiry: client }
  });
}));

// DELETE /api/clients/:id - Admin only: Delete client inquiry
router.delete("/:id", verifyToken, requireAdmin, validateObjectId, catchAsync(async (req, res) => {
  const client = await Client.findByIdAndDelete(req.params.id);
  
  if (!client) {
    throw new AppError('Client inquiry not found', 404, 'CLIENT_NOT_FOUND');
  }
  
  res.json({
    status: 'success',
    message: 'Client inquiry deleted successfully',
    data: { deletedInquiry: client }
  });
}));

module.exports = router;
