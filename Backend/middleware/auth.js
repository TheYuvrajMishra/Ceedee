const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");

const verifyToken = async (req, res, next) => {
  try {
    const auth = req.headers.authorization || "";
    const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;

    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user || !user.isActive) return res.status(401).json({ message: "Invalid user" });

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized", error: err.message });
  }
};

// Require admin role
const requireAdmin = (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden: Admins only" });
  }
  next();
};

module.exports = { verifyToken, requireAdmin };
