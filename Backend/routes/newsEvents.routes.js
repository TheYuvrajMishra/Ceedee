const express = require("express");
const mongoose = require("mongoose");
const { verifyToken, requireAdmin } = require("../middleware/auth");
const { validateNewsEvent, validateObjectId, sanitizeInput } = require("../middleware/validation");
const { catchAsync, AppError } = require("../middleware/errorHandler");

const router = express.Router();
const NewsEvent = mongoose.model("NewsEvent");

// Middleware to handle legacy 'content' field from frontend
const handleContentToDescription = (req, res, next) => {
  if (req.body.content && !req.body.description) {
    req.body.description = req.body.content;
  }
  next();
};

// GET /api/news-events - Public: View news & events
router.get("/", catchAsync(async (req, res) => {
  const { 
    page = 1, 
    limit = 10, 
    type, 
    status = 'Published', 
    sortBy = 'date',
    order = 'desc'
  } = req.query;
  
  // Build filter query
  const filter = { status }; // Default to published only for public
  if (type) filter.type = type;
  
  // Pagination
  const skip = (page - 1) * limit;
  
  // Sort order
  const sortOrder = order === 'desc' ? -1 : 1;
  
  const items = await NewsEvent.find(filter)
    .sort({ [sortBy]: sortOrder })
    .skip(skip)
    .limit(parseInt(limit));
    
  const total = await NewsEvent.countDocuments(filter);
  
  res.json({
    status: 'success',
    results: items.length,
    totalPages: Math.ceil(total / limit),
    currentPage: parseInt(page),
    data: { newsEvents: items }
  });
}));

// GET /api/news-events/admin - Admin only: View all news & events (including drafts)
router.get("/admin", verifyToken, requireAdmin, catchAsync(async (req, res) => {
  const { 
    page = 1, 
    limit = 10, 
    type, 
    status, 
    sortBy = 'createdAt'
  } = req.query;
  
  // Build filter query (admin can see all statuses)
  const filter = {};
  if (type) filter.type = type;
  if (status) filter.status = status;
  
  // Pagination
  const skip = (page - 1) * limit;
  
  const items = await NewsEvent.find(filter)
    .sort({ [sortBy]: -1 })
    .skip(skip)
    .limit(parseInt(limit))
    .populate('createdBy', 'name email'); // Populate admin info
    
  const total = await NewsEvent.countDocuments(filter);
  
  res.json({
    status: 'success',
    results: items.length,
    totalPages: Math.ceil(total / limit),
    currentPage: parseInt(page),
    data: { newsEvents: items }
  });
}));

// GET /api/news-events/:id - Public: Get single news/event
router.get("/:id", validateObjectId, catchAsync(async (req, res) => {
  const item = await NewsEvent.findOne({
    _id: req.params.id,
    status: 'Published' // Only published items for public
  });
  
  if (!item) {
    throw new AppError('News/Event not found or not published', 404, 'NEWS_EVENT_NOT_FOUND');
  }
  
  res.json({
    status: 'success',
    data: { newsEvent: item }
  });
}));

// GET /api/news-events/admin/:id - Admin only: Get single news/event (any status)
router.get("/admin/:id", verifyToken, requireAdmin, validateObjectId, catchAsync(async (req, res) => {
  const item = await NewsEvent.findById(req.params.id)
    .populate('createdBy', 'name email');
  
  if (!item) {
    throw new AppError('News/Event not found', 404, 'NEWS_EVENT_NOT_FOUND');
  }
  
  res.json({
    status: 'success',
    data: { newsEvent: item }
  });
}));

// POST /api/news-events - Admin only: Create news/event
router.post(
  "/", 
  verifyToken, 
  requireAdmin, 
  sanitizeInput, 
  handleContentToDescription, // Compatibility middleware
  validateNewsEvent, 
  catchAsync(async (req, res) => {
    // Add creator info
    const newsEventData = {
      ...req.body,
      createdBy: req.user.id
    };
    
    const item = await NewsEvent.create(newsEventData);
    
    res.status(201).json({
      status: 'success',
      message: 'News/Event created successfully',
      data: { newsEvent: item }
    });
}));

// PUT /api/news-events/:id - Admin only: Update news/event
router.put(
  "/:id", 
  verifyToken, 
  requireAdmin, 
  validateObjectId, 
  sanitizeInput, 
  handleContentToDescription, // Compatibility middleware
  validateNewsEvent, 
  catchAsync(async (req, res) => {
    const item = await NewsEvent.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { 
        new: true,
        runValidators: true
      }
    );
    
    if (!item) {
      throw new AppError('News/Event not found', 404, 'NEWS_EVENT_NOT_FOUND');
    }
    
    res.json({
      status: 'success',
      message: 'News/Event updated successfully',
      data: { newsEvent: item }
    });
}));

// PATCH /api/news-events/:id/status - Admin only: Update status only
router.patch("/:id/status", verifyToken, requireAdmin, validateObjectId, catchAsync(async (req, res) => {
  const { status } = req.body;
  
  if (!['Draft', 'Published', 'Archived'].includes(status)) {
    throw new AppError('Invalid status. Must be Draft, Published, or Archived', 400, 'INVALID_STATUS');
  }
  
  const item = await NewsEvent.findByIdAndUpdate(
    req.params.id, 
    { status }, 
    { new: true }
  );
  
  if (!item) {
    throw new AppError('News/Event not found', 404, 'NEWS_EVENT_NOT_FOUND');
  }
  
  res.json({
    status: 'success',
    message: `News/Event status updated to ${status}`,
    data: { newsEvent: item }
  });
}));

// DELETE /api/news-events/:id - Admin only: Delete news/event
router.delete("/:id", verifyToken, requireAdmin, validateObjectId, catchAsync(async (req, res) => {
  const item = await NewsEvent.findByIdAndDelete(req.params.id);
  
  if (!item) {
    throw new AppError('News/Event not found', 404, 'NEWS_EVENT_NOT_FOUND');
  }
  
  res.json({
    status: 'success',
    message: 'News/Event deleted successfully',
    data: { deletedNewsEvent: item }
  });
}));

// GET /api/news-events/stats/overview - Admin only: News & events statistics
router.get("/stats/overview", verifyToken, requireAdmin, catchAsync(async (req, res) => {
  const totalItems = await NewsEvent.countDocuments();
  const publishedItems = await NewsEvent.countDocuments({ status: 'Published' });
  const draftItems = await NewsEvent.countDocuments({ status: 'Draft' });
  const archivedItems = await NewsEvent.countDocuments({ status: 'Archived' });
  
  // Get items by type
  const typeStats = await NewsEvent.aggregate([
    { $group: { _id: '$type', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);
  
  // Recent activity (last 30 days)
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const recentActivity = await NewsEvent.countDocuments({
    createdAt: { $gte: thirtyDaysAgo }
  });
  
  res.json({
    status: 'success',
    data: {
      overview: {
        totalItems,
        publishedItems,
        draftItems,
        archivedItems
      },
      typeBreakdown: typeStats,
      recentActivity
    }
  });
}));

module.exports = router;