/**
 * Security Headers Configuration
 * Centralized configuration for all security headers
 */

/**
 * Helmet.js configuration for comprehensive security headers
 */
const helmetConfig = {
  // Content Security Policy - Prevents XSS attacks
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'",
        "'unsafe-inline'", // Only for development - remove in production
        "https://cdnjs.cloudflare.com",
        "https://unpkg.com"
      ],
      styleSrc: [
        "'self'",
        "'unsafe-inline'",
        "https://fonts.googleapis.com",
        "https://cdnjs.cloudflare.com"
      ],
      imgSrc: [
        "'self'",
        "data:",
        "https:",
        "blob:"
      ],
      fontSrc: [
        "'self'",
        "https://fonts.gstatic.com",
        "https://cdnjs.cloudflare.com"
      ],
      connectSrc: [
        "'self'",
        process.env.FRONTEND_URL || "http://localhost:3000",
        "https://api.example.com"
      ],
      mediaSrc: ["'self'", "https:"],
      objectSrc: ["'none'"],
      frameSrc: ["'none'"],
      baseUri: ["'self'"],
      formAction: ["'self'"],
      upgradeInsecureRequests: [],
    },
    reportOnly: false
  },

  // Cross-Origin Policies - We set these manually for more control
  crossOriginEmbedderPolicy: false,
  crossOriginOpenerPolicy: false,
  crossOriginResourcePolicy: false,

  // DNS and CT
  dnsPrefetchControl: { allow: false },
  expectCt: {
    enforce: process.env.NODE_ENV === 'production',
    maxAge: 30 * 24 * 60 * 60,
    reportUri: process.env.CT_REPORT_URI || undefined
  },

  // Frame protection
  frameguard: { action: "deny" },

  // Hide technology
  hidePoweredBy: true,

  // HTTPS enforcement
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  },

  // IE protection
  ieNoOpen: true,

  // MIME sniffing protection
  noSniff: true,

  // Origin isolation
  originAgentCluster: true,

  // Browser feature control
  permissionsPolicy: {
    camera: [],
    microphone: [],
    geolocation: [],
    payment: [],
    usb: [],
    magnetometer: [],
    gyroscope: [],
    accelerometer: [],
    autoplay: [],
    "display-capture": [],
    "encrypted-media": [],
    fullscreen: ["'self'"],
    "picture-in-picture": [],
  },

  // Referrer control
  referrerPolicy: { policy: "strict-origin-when-cross-origin" },

  // XSS protection (Deprecated header, disabled)
  xssFilter: false
};

/**
 * Custom security headers middleware
 */
const customSecurityHeaders = (req, res, next) => {
  // Request tracking
  res.setHeader('X-Request-ID', req.headers['x-request-id'] || 'server-' + Date.now());
  res.setHeader('X-API-Version', '1.0.0');
  
  // Cache control
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Surrogate-Control', 'no-store');
  
  // Additional security
  res.setHeader('X-Download-Options', 'noopen');
  res.setHeader('X-Permitted-Cross-Domain-Policies', 'none');
  
  // Set Cross-Origin policies explicitly
  res.setHeader('Cross-Origin-Embedder-Policy', 'unsafe-none');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');

  // Server identification
  res.setHeader('Server', 'CeedeeAPI/1.0');
  res.removeHeader('X-Powered-By');
  
  // Production-only headers
  if (process.env.NODE_ENV === 'production') {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    if (process.env.HPKP_PRIMARY_PIN && process.env.HPKP_BACKUP_PIN) {
      res.setHeader(
        'Public-Key-Pins-Report-Only', 
        `pin-sha256="${process.env.HPKP_PRIMARY_PIN}"; pin-sha256="${process.env.HPKP_BACKUP_PIN}"; max-age=5184000; includeSubDomains; report-uri="${process.env.HPKP_REPORT_URI || 'https://example.com/hpkp-report'}"`
      );
    }
  }
  
  next();
};

module.exports = {
  helmetConfig,
  customSecurityHeaders
};