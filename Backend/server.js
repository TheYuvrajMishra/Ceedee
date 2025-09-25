require("dotenv").config();
const express = require("express");
const connectDB = require("./db/config");
const loadModels = require("./models"); // auto-register models
const cors = require("cors");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");

// Import configurations
const {
  globalErrorHandler,
  handleUnhandledRejection,
  handleUncaughtException,
  gracefulShutdown
} = require("./middleware/errorHandler");
const { globalLimiter, authLimiter, contactLimiter } = require("./config/rateLimits");
const { helmetConfig, customSecurityHeaders } = require("./config/securityHeaders");

const app = express();

// Initialize error handlers for unhandled rejections and exceptions
handleUnhandledRejection();
handleUncaughtException();

// Apply security middleware
app.use(helmet(helmetConfig));
app.use(customSecurityHeaders);
app.use(globalLimiter);

// SECURITY: Enhanced request size limits and validation
const REQUEST_LIMITS = {
  json: "1mb",
  urlencoded: "1mb",
  auth: "10kb",
  upload: "5mb",
  admin: "2mb",
};

// SECURITY: Enhanced JSON parsing with error handling
const createJSONMiddleware = (limit) => {
  return (req, res, next) => {
    express.json({
      limit,
      strict: true,
      type: 'application/json'
    })(req, res, (err) => {
      if (err) {
        console.error(`JSON parsing error on ${req.method} ${req.path}:`, err.message);
        if (err.type === 'entity.parse.failed') {
          return res.status(400).json({
            status: 'error',
            message: 'Invalid JSON format',
            code: 'INVALID_JSON'
          });
        }
        if (err.type === 'entity.too.large') {
          return res.status(413).json({
            status: 'error',
            message: 'Request payload too large',
            code: 'PAYLOAD_TOO_LARGE'
          });
        }
        return res.status(400).json({
          status: 'error',
          message: 'Bad request format',
          code: 'BAD_REQUEST'
        });
      }
      next();
    });
  };
};

// Apply JSON middleware with error handling
app.use('/api/auth', createJSONMiddleware(REQUEST_LIMITS.auth));
app.use('/api/admin', createJSONMiddleware(REQUEST_LIMITS.admin));
app.use(createJSONMiddleware(REQUEST_LIMITS.json));

// SECURITY: Enhanced URL encoding with limits
app.use(express.urlencoded({
  extended: false,
  limit: REQUEST_LIMITS.urlencoded,
  parameterLimit: 20,
  type: 'application/x-www-form-urlencoded'
}));

// SECURITY: Enhanced CORS configuration
const allowedOrigins = [
  // Explicit env-configured frontends
  process.env.FRONTEND_URL,
  process.env.FRONTEND_URL_2,
  process.env.FRONTEND_URL_3,
  // Local development
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:5150'
].filter(Boolean);

const allowedOriginPatterns = [
  // Allow Vercel preview/prod frontend domains
  /https?:\/\/.+\.vercel\.app$/i,
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // Server-to-server, curl, Postman
    const isAllowed =
      allowedOrigins.includes(origin) ||
      allowedOriginPatterns.some((re) => re.test(origin));
    if (isAllowed) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin',
    'Cache-Control',
    'X-File-Name'
  ],
  exposedHeaders: ['X-Request-ID', 'X-API-Version'],
  maxAge: 86400,
  optionsSuccessStatus: 204
}));

// Handle preflight requests early
app.options('*', cors());

// SECURITY: Sanitize MongoDB queries to prevent NoSQL injection
app.use(mongoSanitize({
  replaceWith: '_',
  allowDots: false,
  onSanitize: ({ req, key }) => {
    console.warn(`⚠️  MongoDB injection attempt detected and sanitized: ${key} from IP: ${req.ip}`);
  }
}));

// DB + models
connectDB();
loadModels();

// Routes with specific rate limiting
app.use("/api/auth", authLimiter, require("./routes/auth.routes"));
app.use("/api/careers", require("./routes/career.routes"));
app.use("/api/career-applications", require("./routes/careerApplication.routes"));
app.use("/api/clients", contactLimiter, require("./routes/client.routes"));
app.use("/api/csr", require("./routes/csr.routes"));
app.use("/api/news-events", require("./routes/newsEvents.routes"));

// Health check endpoint
app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Ceedee API is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    version: "1.0.0"
  });
});

// Handle 404 errors for undefined routes
app.all('*', (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  err.status = 'fail';
  err.statusCode = 404;
  next(err);
});

// Global error handling middleware (must be last)
app.use(globalErrorHandler);

// Export Express app for serverless (Vercel). Start server only in non-serverless environments.
if (process.env.VERCEL) {
  module.exports = app;
} else {
  const PORT = process.env.PORT || 5000;
  const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🛡️  Security features enabled: Rate limiting, CORS, Helmet, MongoDB sanitization`);
  });

  // Setup graceful shutdown
  gracefulShutdown(server);
}