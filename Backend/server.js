require("dotenv").config();
const express = require("express");
const connectDB = require("./db/config");
const loadModels = require("./models"); // auto-register models
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const app = express();

// SECURITY: Rate limiting middleware
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per windowMs
  message: {
    error: "Too many requests from this IP, please try again later.",
    retryAfter: "15 minutes"
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  // Skip rate limiting for certain IPs (optional)
  skip: (req) => {
    // You can add trusted IPs here if needed
    return false;
  }
});

// SECURITY: Stricter rate limiting for authentication endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 5, // Limit each IP to 5 auth requests per windowMs
  message: {
    error: "Too many authentication attempts, please try again later.",
    retryAfter: "15 minutes"
  },
  standardHeaders: true,
  legacyHeaders: false,
  // Enable skip successful requests for login (optional)
  skipSuccessfulRequests: true
});

// SECURITY: Rate limiting for client contact forms to prevent spam
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  limit: 3, // Limit each IP to 3 contact form submissions per hour
  message: {
    error: "Too many contact form submissions, please try again later.",
    retryAfter: "1 hour"
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Apply global rate limiting to all requests
app.use(globalLimiter);

// Core middlewares
app.use(express.json({ limit: "10mb" })); // Added size limit for security
app.use(cors());

// DB + models
connectDB();
loadModels();

// Routes with specific rate limiting
app.use("/api/auth", authLimiter, require("./routes/auth.routes")); // Stricter rate limiting for auth
app.use("/api/careers", require("./routes/career.routes"));
app.use("/api/clients", contactLimiter, require("./routes/client.routes")); // Rate limit contact forms
app.use("/api/csr", require("./routes/csr.routes"));
app.use("/api/news-events", require("./routes/newsEvents.routes"));


app.get("/", (req, res) => res.send("API is running..."));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
