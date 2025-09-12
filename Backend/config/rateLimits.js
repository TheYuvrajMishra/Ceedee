/**
 * Rate Limiting Configuration
 * Centralized configuration for all rate limiting rules
 */

const rateLimit = require("express-rate-limit");

// Global rate limiting for all endpoints
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // 100 requests per window per IP
  message: {
    error: "Too many requests from this IP, please try again later.",
    retryAfter: "15 minutes"
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    // Skip rate limiting for trusted IPs (add your server IPs here)
    const trustedIPs = process.env.TRUSTED_IPS?.split(',') || [];
    return trustedIPs.includes(req.ip);
  }
});

// Strict rate limiting for authentication endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 5, // Only 5 auth attempts per window
  message: {
    error: "Too many authentication attempts, please try again later.",
    retryAfter: "15 minutes"
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, // Don't count successful logins
  // Custom key generator to track by IP + User-Agent for better security
  keyGenerator: (req) => {
    return req.ip + ':' + (req.get('User-Agent') || '');
  }
});

// Rate limiting for contact forms to prevent spam
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  limit: 100, // Only 3 contact submissions per hour
  message: {
    error: "Too many contact form submissions, please try again later.",
    retryAfter: "1 hour"
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Rate limiting for admin operations
const adminLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  limit: 20, // 20 admin operations per 5 minutes
  message: {
    error: "Too many admin operations, please slow down.",
    retryAfter: "5 minutes"
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Rate limiting for file uploads (if you add file upload later)
const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  limit: 10, // 10 uploads per hour
  message: {
    error: "Too many file uploads, please try again later.",
    retryAfter: "1 hour"
  },
  standardHeaders: true,
  legacyHeaders: false
});

module.exports = {
  globalLimiter,
  authLimiter,
  contactLimiter,
  adminLimiter,
  uploadLimiter
};
