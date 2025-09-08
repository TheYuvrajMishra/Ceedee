const jwt = require("jsonwebtoken");

// SECURITY: Enhanced JWT configuration for production
const JWT_CONFIG = {
  // Shorter expiration for better security (2 hours instead of 7 days)
  accessTokenExpiry: process.env.NODE_ENV === 'production' ? "2h" : "24h",
  refreshTokenExpiry: "7d",
  
  // Algorithm specification for security
  algorithm: "HS256",
  
  // Issuer and audience for JWT validation
  issuer: process.env.JWT_ISSUER || "ceedee-api",
  audience: process.env.JWT_AUDIENCE || "ceedee-client",
};

// SECURITY: Validate JWT secret strength
const validateJWTSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET environment variable is required");
  }
  if (secret.length < 32) {
    console.warn("⚠️  WARNING: JWT_SECRET should be at least 32 characters for production security");
  }
  if (secret === "test-secret-key" || secret === "your-secret-key") {
    throw new Error("🔴 CRITICAL: Default JWT_SECRET detected. Change to a secure random string!");
  }
  return secret;
};

// Enhanced token signing with security features
const signToken = (payload, options = {}) => {
  const secret = validateJWTSecret();
  
  // Add issued at and not before claims to payload
  const enhancedPayload = {
    ...payload,
    iat: Math.floor(Date.now() / 1000),
    nbf: Math.floor(Date.now() / 1000),
  };
  
  const defaultOptions = {
    expiresIn: JWT_CONFIG.accessTokenExpiry,
    algorithm: JWT_CONFIG.algorithm,
    issuer: JWT_CONFIG.issuer,
    audience: JWT_CONFIG.audience,
  };

  return jwt.sign(enhancedPayload, secret, { ...defaultOptions, ...options });
};

// Enhanced token verification with comprehensive validation
const verifyToken = (token, options = {}) => {
  const secret = validateJWTSecret();
  
  const defaultOptions = {
    algorithms: [JWT_CONFIG.algorithm],
    issuer: JWT_CONFIG.issuer,
    audience: JWT_CONFIG.audience,
    // Clock tolerance for server time differences
    clockTolerance: 60, // 60 seconds
  };

  try {
    return jwt.verify(token, secret, { ...defaultOptions, ...options });
  } catch (error) {
    // Enhanced error handling for different JWT errors
    if (error.name === 'TokenExpiredError') {
      const expError = new Error('Token has expired');
      expError.name = 'TokenExpiredError';
      expError.expiredAt = error.expiredAt;
      throw expError;
    } else if (error.name === 'JsonWebTokenError') {
      const jwtError = new Error('Invalid token');
      jwtError.name = 'JsonWebTokenError';
      throw jwtError;
    } else if (error.name === 'NotBeforeError') {
      const nbfError = new Error('Token not active yet');
      nbfError.name = 'NotBeforeError';
      throw nbfError;
    }
    throw error;
  }
};

// Generate refresh token with longer expiry
const signRefreshToken = (payload) => {
  return signToken(payload, { expiresIn: JWT_CONFIG.refreshTokenExpiry });
};

// Decode token without verification (for debugging/logging)
const decodeToken = (token) => {
  return jwt.decode(token, { complete: true });
};

module.exports = { 
  signToken, 
  verifyToken, 
  signRefreshToken,
  decodeToken,
  JWT_CONFIG 
};
