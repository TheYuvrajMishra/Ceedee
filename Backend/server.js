require("dotenv").config();
const express = require("express");
const connectDB = require("./db/config");
const loadModels = require("./models"); // auto-register models
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");

const app = express();

// SECURITY: Rate limiting middleware
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs (Express 4 uses 'max' instead of 'limit')
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
  max: 5, // Limit each IP to 5 auth requests per windowMs (Express 4 uses 'max')
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
  max: 3, // Limit each IP to 3 contact form submissions per hour (Express 4 uses 'max')
  message: {
    error: "Too many contact form submissions, please try again later.",
    retryAfter: "1 hour"
  },
  standardHeaders: true,
  legacyHeaders: false
});

// SECURITY: Comprehensive security headers configuration
app.use(helmet({
  // Content Security Policy - Prevents XSS attacks
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'",
        "'unsafe-inline'", // Only for development - remove in production
        "https://cdnjs.cloudflare.com", // Allow trusted CDNs
        "https://unpkg.com"
      ],
      styleSrc: [
        "'self'",
        "'unsafe-inline'", // Allow inline styles for frameworks
        "https://fonts.googleapis.com",
        "https://cdnjs.cloudflare.com"
      ],
      imgSrc: [
        "'self'",
        "data:", // Allow data URLs for images
        "https:", // Allow HTTPS images
        "blob:" // Allow blob URLs
      ],
      fontSrc: [
        "'self'",
        "https://fonts.gstatic.com",
        "https://cdnjs.cloudflare.com"
      ],
      connectSrc: [
        "'self'",
        process.env.FRONTEND_URL || "http://localhost:3000", // Allow frontend connections
        "https://api.example.com" // Add your API endpoints
      ],
      mediaSrc: ["'self'", "https:"],
      objectSrc: ["'none'"], // Prevent embedding objects
      frameSrc: ["'none'"], // Prevent framing except from self
      baseUri: ["'self'"], // Restrict base tag
      formAction: ["'self'"], // Restrict form submissions
      upgradeInsecureRequests: [], // Upgrade HTTP to HTTPS
    },
    reportOnly: false // Set to true for testing, false for enforcement
  },

  // Cross-Origin Embedder Policy - Controls resource loading
  crossOriginEmbedderPolicy: false, // We'll set this manually

  // Cross-Origin Opener Policy - Prevents cross-origin attacks  
  crossOriginOpenerPolicy: false, // We'll set this manually

  // Cross-Origin Resource Policy - Controls cross-origin resource sharing
  crossOriginResourcePolicy: false, // We'll set this manually

  // DNS Prefetch Control - Controls browser DNS prefetching
  dnsPrefetchControl: {
    allow: false
  },

  // Expect Certificate Transparency - Requires CT for certificates
  expectCt: {
    enforce: true,
    maxAge: 30 * 24 * 60 * 60, // 30 days
    reportUri: process.env.CT_REPORT_URI || undefined
  },

  // X-Frame-Options - Prevents clickjacking
  frameguard: {
    action: "deny" // Force DENY instead of SAMEORIGIN
  },

  // Hide X-Powered-By header
  hidePoweredBy: true,

  // HTTP Strict Transport Security - Forces HTTPS
  hsts: {
    maxAge: 31536000, // 1 year
    includeSubDomains: true,
    preload: true
  },

  // IE No Open - Prevents IE from executing downloads
  ieNoOpen: true,

  // X-Content-Type-Options - Prevents MIME sniffing
  noSniff: true,

  // Origin Agent Cluster - Isolate origins
  originAgentCluster: true,

  // Permissions Policy - Controls browser features
  permissionsPolicy: {
    camera: [], // Disable camera
    microphone: [], // Disable microphone
    geolocation: [], // Disable geolocation
    payment: [], // Disable payment API
    usb: [], // Disable USB
    magnetometer: [], // Disable magnetometer
    gyroscope: [], // Disable gyroscope
    accelerometer: [], // Disable accelerometer
    autoplay: [], // Disable autoplay
    "display-capture": [], // Disable screen capture
    "encrypted-media": [], // Disable encrypted media
    fullscreen: ["'self'"], // Allow fullscreen only from same origin
    "picture-in-picture": [], // Disable picture-in-picture
  },

  // Referrer Policy - Controls referrer information
  referrerPolicy: {
    policy: "strict-origin-when-cross-origin" // Fixed: removed array wrapper
  },

  // X-XSS-Protection - XSS filter (force enable with block mode)
  xssFilter: false // Disable helmet's default, we'll set it manually
}));

// SECURITY: Additional custom security headers (MUST come after helmet)
app.use((req, res, next) => {
  // Security headers not covered by helmet or need manual setting
  res.setHeader('X-Request-ID', req.headers['x-request-id'] || 'server-' + Date.now());
  res.setHeader('X-API-Version', '1.0.0');
  
  // Cache control headers (critical for security)
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Surrogate-Control', 'no-store');
  
  // XSS Protection - Manual setting for proper configuration
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  // Override/set Cross-Origin policies explicitly
  res.setHeader('Cross-Origin-Embedder-Policy', 'unsafe-none');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  
  // Additional security headers
  res.setHeader('X-Download-Options', 'noopen'); // IE8+ download security
  res.setHeader('X-Permitted-Cross-Domain-Policies', 'none'); // Adobe Flash/PDF policy
  res.setHeader('Clear-Site-Data', '"cache", "cookies", "storage"'); // Clear data on logout
  res.setHeader('Cross-Origin-Embedder-Policy-Report-Only', 'require-corp'); // Report embedder policy
  res.setHeader('Cross-Origin-Opener-Policy-Report-Only', 'same-origin'); // Report opener policy
  
  // Server identification (hide real server technology)
  res.setHeader('Server', 'CeedeeAPI/1.0');
  res.removeHeader('X-Powered-By'); // Additional removal (helmet also does this)
  
  // Environment-specific headers
  if (process.env.NODE_ENV === 'production') {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    if (process.env.HPKP_PRIMARY_PIN && process.env.HPKP_BACKUP_PIN) {
      res.setHeader('Public-Key-Pins-Report-Only', 
        `pin-sha256="${process.env.HPKP_PRIMARY_PIN}"; pin-sha256="${process.env.HPKP_BACKUP_PIN}"; max-age=5184000; includeSubDomains; report-uri="${process.env.HPKP_REPORT_URI || 'https://example.com/hpkp-report'}"`
      );
    }
  }
  
  next();
});

// SECURITY: Sanitize MongoDB queries to prevent NoSQL injection
app.use(mongoSanitize({
  replaceWith: '_', // Replace prohibited characters with underscore
  allowDots: false, // Don't allow dots in keys
  onSanitize: ({ req, key }) => {
    console.warn(`⚠️  Sanitized key: ${key} in request from ${req.ip}`);
  }
}));

// Apply global rate limiting to all requests
app.use(globalLimiter);

// Core middlewares
app.use(express.json({ limit: "10mb" })); // Added size limit for security
app.use(express.urlencoded({ extended: true, limit: "10mb" })); // Added URL encoding support
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
