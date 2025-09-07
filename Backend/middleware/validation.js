/**
 * Input Validation Middleware
 * Comprehensive validation and sanitization for all user inputs
 */

const { body, param, query, validationResult } = require('express-validator');

/**
 * Handle validation errors
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => ({
      field: error.path,
      message: error.msg,
      value: error.value
    }));
    
    console.warn(`⚠️  Validation failed for ${req.method} ${req.path} from ${req.ip}:`, errorMessages);
    
    return res.status(400).json({
      error: 'Validation failed',
      details: errorMessages
    });
  }
  next();
};

/**
 * User registration validation
 */
const validateUserRegistration = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s'-]+$/)
    .withMessage('Name can only contain letters, spaces, hyphens, and apostrophes')
    .escape(), // HTML escape
  
  body('email')
    .isEmail()
    .withMessage('Must be a valid email address')
    .normalizeEmail()
    .isLength({ max: 100 })
    .withMessage('Email must not exceed 100 characters'),
  
  body('password')
    .isLength({ min: 8, max: 128 })
    .withMessage('Password must be between 8 and 128 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
  
  handleValidationErrors
];

/**
 * User login validation
 */
const validateUserLogin = [
  body('email')
    .isEmail()
    .withMessage('Must be a valid email address')
    .normalizeEmail()
    .isLength({ max: 100 })
    .withMessage('Email must not exceed 100 characters'),
  
  body('password')
    .isLength({ min: 1, max: 128 })
    .withMessage('Password is required and must not exceed 128 characters'),
  
  handleValidationErrors
];

/**
 * Client inquiry validation
 */
const validateClientInquiry = [
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
  
  body('phone')
    .optional()
    .isMobilePhone()
    .withMessage('Must be a valid phone number')
    .isLength({ max: 20 })
    .withMessage('Phone number must not exceed 20 characters'),
  
  body('company')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Company name must not exceed 200 characters')
    .escape(),
  
  body('query')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Query must be between 10 and 2000 characters')
    .escape(),
  
  body('contactPreference')
    .optional()
    .isIn(['Email', 'Phone', 'WhatsApp', 'Any'])
    .withMessage('Invalid contact preference'),
  
  body('notes')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Notes must not exceed 1000 characters')
    .escape(),
  
  handleValidationErrors
];

/**
 * Career posting validation
 */
const validateCareerPosting = [
  body('title')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Job title must be between 5 and 200 characters')
    .escape(),
  
  body('description')
    .trim()
    .isLength({ min: 50, max: 5000 })
    .withMessage('Job description must be between 50 and 5000 characters')
    .escape(),
  
  body('location')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Location must not exceed 100 characters')
    .escape(),
  
  body('type')
    .optional()
    .isIn(['Full-time', 'Part-time', 'Contract', 'Internship'])
    .withMessage('Invalid job type'),
  
  body('salary')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Salary must not exceed 50 characters')
    .escape(),
  
  body('requirements')
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage('Requirements must not exceed 2000 characters')
    .escape(),
  
  handleValidationErrors
];

/**
 * News/Event validation
 */
const validateNewsEvent = [
  body('title')
    .trim()
    .isLength({ min: 5, max: 300 })
    .withMessage('Title must be between 5 and 300 characters')
    .escape(),
  
  body('content')
    .trim()
    .isLength({ min: 20, max: 10000 })
    .withMessage('Content must be between 20 and 10000 characters')
    .escape(),
  
  body('date')
    .optional()
    .isISO8601()
    .withMessage('Date must be in valid ISO format')
    .toDate(),
  
  body('category')
    .optional()
    .isIn(['News', 'Event', 'Announcement', 'Update'])
    .withMessage('Invalid category'),
  
  body('author')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Author name must not exceed 100 characters')
    .escape(),
  
  handleValidationErrors
];

/**
 * CSR project validation
 */
const validateCSRProject = [
  body('title')
    .trim()
    .isLength({ min: 5, max: 300 })
    .withMessage('Title must be between 5 and 300 characters')
    .escape(),
  
  body('description')
    .trim()
    .isLength({ min: 20, max: 5000 })
    .withMessage('Description must be between 20 and 5000 characters')
    .escape(),
  
  body('location')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Location must not exceed 200 characters')
    .escape(),
  
  body('impact')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Impact description must not exceed 1000 characters')
    .escape(),
  
  body('startDate')
    .optional()
    .isISO8601()
    .withMessage('Start date must be in valid ISO format')
    .toDate(),
  
  body('endDate')
    .optional()
    .isISO8601()
    .withMessage('End date must be in valid ISO format')
    .toDate(),
  
  handleValidationErrors
];

/**
 * MongoDB ObjectId validation
 */
const validateObjectId = [
  param('id')
    .isMongoId()
    .withMessage('Invalid ID format'),
  
  handleValidationErrors
];

/**
 * General sanitization middleware
 */
const sanitizeInput = (req, res, next) => {
  // Additional sanitization beyond express-validator
  const sanitizeValue = (value) => {
    if (typeof value === 'string') {
      // Remove null bytes
      value = value.replace(/\0/g, '');
      // Remove control characters except tab, newline, carriage return
      value = value.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
    }
    return value;
  };

  const sanitizeObject = (obj) => {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          sanitizeObject(obj[key]);
        } else {
          obj[key] = sanitizeValue(obj[key]);
        }
      }
    }
  };

  if (req.body) sanitizeObject(req.body);
  if (req.query) sanitizeObject(req.query);
  if (req.params) sanitizeObject(req.params);

  next();
};

module.exports = {
  validateUserRegistration,
  validateUserLogin,
  validateClientInquiry,
  validateCareerPosting,
  validateNewsEvent,
  validateCSRProject,
  validateObjectId,
  sanitizeInput,
  handleValidationErrors
};
