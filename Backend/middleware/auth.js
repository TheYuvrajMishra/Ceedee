const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const { AppError } = require("./errorHandler");

// Token verification middleware
const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    let token = null;

    // Case-insensitive check for "Bearer "
    if (authHeader.toLowerCase().startsWith("bearer ")) {
      token = authHeader.substring(7);
    }

    if (!token) {
      throw new AppError("No token provided, authorization denied", 401, "NO_TOKEN");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find user in the User model
    const user = await User.findById(decoded.id).select("-password");
    
    if (!user || !user.isActive) {
      throw new AppError("Invalid token or user deactivated", 401, "INVALID_TOKEN");
    }

    // Attach user info to request
    req.user = user;
    
    next();
  } catch (err) {
    // Handle specific JWT errors
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: "Invalid token", error: err.message });
    }
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: "Token expired", error: err.message });
    }
    // Forward other errors to the global error handler
    next(err);
  }
};

// Middleware to require admin role
const requireAdmin = (req, res, next) => {
  if (!req.user) {
    // This should ideally not be hit if verifyToken runs first
    return res.status(401).json({ message: "Unauthorized - No user found" });
  }
  
  // Check if user has admin role
  if (req.user.role !== "admin") {
    return res.status(403).json({ 
      message: "Forbidden: Administrator access required",
      userRole: req.user.role
    });
  }
  
  next();
};

module.exports = { 
  verifyToken, 
  requireAdmin
};