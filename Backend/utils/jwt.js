const jwt = require("jsonwebtoken");

const signToken = (payload, options = {}) =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d", ...options });

const verifyToken = (token) =>
  jwt.verify(token, process.env.JWT_SECRET);

module.exports = { signToken, verifyToken };
