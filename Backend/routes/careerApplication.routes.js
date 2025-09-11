const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { body } = require('express-validator');
const { verifyToken, requireAdmin } = require("../middleware/auth");
const { sanitizeInput, validateObjectId, handleValidationErrors } = require("../middleware/validation");
const { catchAsync, AppError } = require("../middleware/errorHandler");

const CareerApplication = mongoose.model("CareerApplication");
const Career = mongoose.model("Career");

const validateCareerApplication = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s'-]+$/)
    .withMessage('Name can only contain letters, spaces, hyphens, and apostrophes')
    .escape(),

  body('email')
    .isEmail()
    .withMessage('Must be a valid email address')
    .normalizeEmail()
    .isLength({ max: 100 })
    .withMessage('Email must not exceed 100 characters'),

  body('careerId')
    .isMongoId()
    .withMessage('Invalid Career ID format'),

  handleValidationErrors
];

// POST /api/career-applications - Public: Submit a career application
router.post("/", sanitizeInput, validateCareerApplication, catchAsync(async (req, res) => {
    const { name, email, careerId } = req.body;

    // Check if the career exists
    const career = await Career.findById(careerId);
    if (!career) {
        throw new AppError('Career not found', 404, 'CAREER_NOT_FOUND');
    }

    const newApplication = await CareerApplication.create({
        name,
        email,
        career: careerId
    });

    res.status(201).json({
        status: 'success',
        message: "Career application submitted successfully",
        data: { application: newApplication }
    });
}));

// GET /api/career-applications - Admin only: View all career applications
router.get("/", verifyToken, requireAdmin, catchAsync(async (req, res) => {
    const { page = 1, limit = 10, sortBy = 'createdAt' } = req.query;

    // Pagination
    const skip = (page - 1) * limit;

    const applications = await CareerApplication.find()
        .sort({ [sortBy]: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .populate('career', 'title'); // Populate career title

    const total = await CareerApplication.countDocuments();

    res.json({
        status: 'success',
        results: applications.length,
        totalPages: Math.ceil(total / limit),
        currentPage: parseInt(page),
        data: { applications: applications }
    });
}));

// GET /api/career-applications/career/:id - Admin only: View all applications for a specific career
router.get("/career/:id", verifyToken, requireAdmin, validateObjectId, catchAsync(async (req, res) => {
    const { page = 1, limit = 10, sortBy = 'createdAt' } = req.query;

    const careerId = req.params.id;

    // Check if the career exists
    const career = await Career.findById(careerId);
    if (!career) {
        throw new AppError('Career not found', 404, 'CAREER_NOT_FOUND');
    }

    // Pagination
    const skip = (page - 1) * limit;

    const applications = await CareerApplication.find({ career: careerId })
        .sort({ [sortBy]: -1 })
        .skip(skip)
        .limit(parseInt(limit));

    const total = await CareerApplication.countDocuments({ career: careerId });

    res.json({
        status: 'success',
        results: applications.length,
        totalPages: Math.ceil(total / limit),
        currentPage: parseInt(page),
        data: { applications: applications }
    });
}));

module.exports = router;