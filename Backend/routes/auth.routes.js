const express = require("express");
const mongoose = require("mongoose");
const { signToken } = require("../utils/jwt");
const { verifyToken, requireAdmin } = require("../middleware/auth");

const router = express.Router();
const User = mongoose.model("User");

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body; // REMOVED role from destructuring

    // Input validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already registered" });

    // SECURITY FIX: Force role to 'user' - no admin creation via public registration
    const user = await User.create({ 
      name, 
      email, 
      password, 
      role: 'user' // HARDCODED to 'user' - prevents admin escalation
    });
    
    const token = signToken({ id: user._id, role: user.role });

    res.status(201).json({
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      token,
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: "Registration failed" }); // Don't expose error details
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const ok = await user.matchPassword(password);
    if (!ok) return res.status(400).json({ message: "Invalid credentials" });

    const token = signToken({ id: user._id, role: user.role });

    res.json({
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      token,
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: "Login failed" }); // Don't expose error details
  }
});

// POST /api/auth/create-admin - SECURE admin creation (admin-only)
router.post("/create-admin", verifyToken, requireAdmin, async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Input validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already registered" });

    // Only existing admins can create new admin accounts
    const newAdmin = await User.create({ 
      name, 
      email, 
      password, 
      role: 'admin' // Only accessible via this protected endpoint
    });
    
    res.status(201).json({
      message: "Admin created successfully",
      admin: { id: newAdmin._id, name: newAdmin.name, email: newAdmin.email, role: newAdmin.role }
    });
  } catch (err) {
    console.error('Admin creation error:', err);
    res.status(500).json({ message: "Admin creation failed" });
  }
});

module.exports = router;
