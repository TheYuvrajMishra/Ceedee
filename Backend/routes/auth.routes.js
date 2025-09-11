const express = require("express");
const mongoose = require("mongoose");
const { signToken } = require("../utils/jwt");
const { verifyToken, requireAdmin, checkAlreadyAuthenticated } = require("../middleware/auth");
const { 
  validateUserRegistration, 
  validateUserLogin, 
  sanitizeInput 
} = require("../middleware/validation");
const { catchAsync, AppError } = require("../middleware/errorHandler");

const router = express.Router();
const User = mongoose.model("User");

// POST /api/auth/register
router.post("/register", sanitizeInput, validateUserRegistration, catchAsync(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError("Email already registered", 400, "EMAIL_EXISTS");
  }

  // Create new user with 'user' role. Admin creation is handled by a separate endpoint.
  const user = await User.create({ 
    name, 
    email, 
    password, 
    role: 'user' // Explicitly set role to 'user' for security
  });
  
  // Sign token without the 'source' field
  const token = signToken({ id: user._id, role: user.role });

  res.status(201).json({
    status: 'success',
    message: 'User registered successfully',
    data: {
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      token
    }
  });
}));

// POST /api/auth/login
router.post("/login", sanitizeInput, validateUserLogin, catchAsync(async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email, isActive: true });
  if (!user) {
    throw new AppError("Invalid credentials", 401, "INVALID_CREDENTIALS");
  }

  // Check password
  const isPasswordValid = await user.matchPassword(password);
  if (!isPasswordValid) {
    throw new AppError("Invalid credentials", 401, "INVALID_CREDENTIALS");
  }

  // Sign token without the 'source' field
  const token = signToken({ id: user._id, role: user.role });

  res.json({
    status: 'success',
    message: 'Login successful',
    data: {
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      token
    }
  });
}));

// POST /api/auth/create-admin - SECURE admin creation (admin-only)
router.post("/create-admin", verifyToken, requireAdmin, sanitizeInput, validateUserRegistration, catchAsync(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError("Email already registered", 400, "EMAIL_EXISTS");
  }

  // Create a new user with the 'admin' role
  const newAdmin = await User.create({ 
    name, 
    email, 
    password, 
    role: 'admin' 
  });
  
  res.status(201).json({
    status: 'success',
    message: "Admin created successfully",
    data: {
      admin: { id: newAdmin._id, name: newAdmin.name, email: newAdmin.email, role: newAdmin.role }
    }
  });
}));

// GET /api/auth/me - Get current user info
router.get("/me", verifyToken, catchAsync(async (req, res) => {
  res.json({
    status: 'success',
    message: 'User authenticated',
    data: {
      user: { 
        id: req.user._id, 
        name: req.user.name, 
        email: req.user.email, 
        role: req.user.role 
      }
    }
  });
}));

// POST /api/auth/logout
router.post("/logout", verifyToken, catchAsync(async (req, res) => {
  // Instruct the client to clear authentication tokens and related data.
  // For security, the client-side should handle the actual removal of the token.
  res.setHeader('Clear-Site-Data', '"cookies", "storage"');
  
  res.json({
    status: 'success',
    message: 'Logout successful. Please clear your token.',
    data: {
      user: {
        id: req.user._id,
        name: req.user.name
      }
    }
  });
}));

module.exports = router;