/**
 * Comprehensive error handling middleware
 * Handles all types of errors and provides secure error responses
 */

const mongoose = require('mongoose');

// Custom error class for application errors
class AppError extends Error {
  constructor(message, statusCode, code = null) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true;
    
    Error.captureStackTrace(this, this.constructor);
  }
}

// Enhanced error logging
const logError = (error, req = null) => {
  const timestamp = new Date().toISOString();
  const errorLog = {
    timestamp,
    error: {
      name: error.name,
      message: error.message,
      stack: error.stack,
      code: error.code,
      statusCode: error.statusCode
    }
  };

  if (req) {
    errorLog.request = {
      method: req.method,
      url: req.url,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      userId: req.user?.id || 'anonymous'
    };
  }

  console.error('🔴 ERROR:', JSON.stringify(errorLog, null, 2));
};

// Handle different types of errors
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400, 'INVALID_ID');
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg?.match(/(["'])(\\?.)*?\1/)?.[0];
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400, 'DUPLICATE_FIELD');
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map(el => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400, 'VALIDATION_ERROR');
};

const handleJWTError = () =>
  new AppError('Invalid token. Please log in again!', 401, 'INVALID_TOKEN');

const handleJWTExpiredError = () =>
  new AppError('Your token has expired! Please log in again.', 401, 'EXPIRED_TOKEN');

// Send error response in development
const sendErrorDev = (err, req, res) => {
  logError(err, req);
  
  return res.status(err.statusCode || 500).json({
    status: 'error',
    error: err,
    message: err.message,
    stack: err.stack,
    code: err.code || 'INTERNAL_ERROR'
  });
};

// Send error response in production (sanitized)
const sendErrorProd = (err, req, res) => {
  // Log all errors for monitoring
  logError(err, req);

  // Operational, trusted error: send message to client
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      code: err.code || 'OPERATIONAL_ERROR'
    });
  }

  // Programming or other unknown error: don't leak error details
  return res.status(500).json({
    status: 'error',
    message: 'Something went wrong!',
    code: 'INTERNAL_ERROR'
  });
};

// Main error handling middleware
const globalErrorHandler = (err, req, res, next) => {
  // Prevent multiple error responses
  if (res.headersSent) {
    return next(err);
  }

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Handle Express built-in errors
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

  // Handle syntax errors (malformed JSON)
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid JSON syntax',
      code: 'JSON_SYNTAX_ERROR'
    });
  }

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else {
    let error = { ...err };
    error.message = err.message;

    // Handle specific mongoose errors
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

    sendErrorProd(error, req, res);
  }
};

// Async error wrapper to catch async errors
const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

// Handle unhandled rejections
const handleUnhandledRejection = () => {
  process.on('unhandledRejection', (err) => {
    console.error('🔴 UNHANDLED REJECTION! 💥 Shutting down...');
    logError(err);
    // process.exit(1);
  });
};

// Handle uncaught exceptions
const handleUncaughtException = () => {
  process.on('uncaughtException', (err) => {
    console.error('🔴 UNCAUGHT EXCEPTION! 💥 Shutting down...');
    logError(err);
    // process.exit(1);
  });
};

// Graceful shutdown handler
const gracefulShutdown = (server) => {
  const shutdown = (signal) => {
    process.on(signal, () => {
      console.log(`🔄 ${signal} received. Graceful shutdown initiated...`);
      server.close((err) => {
        if (err) {
          console.error('🔴 Error during server shutdown:', err);
          process.exit(1);
        }
        console.log('✅ Server closed successfully');
        mongoose.connection.close(false, () => {
          console.log('✅ MongoDB connection closed');
          process.exit(0);
        });
      });
    });
  };

  shutdown('SIGTERM');
  shutdown('SIGINT');
};

module.exports = {
  AppError,
  globalErrorHandler,
  catchAsync,
  handleUnhandledRejection,
  handleUncaughtException,
  gracefulShutdown,
  logError
};
