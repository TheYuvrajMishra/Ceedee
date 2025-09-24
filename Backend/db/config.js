const mongoose = require("mongoose");

// Cache connection across hot reloads and serverless invocations
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

// db/config.js
const connectDB = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error('MONGO_URI env var is required');
    }

    cached.promise = mongoose
      .connect(mongoUri, {
        // keep options minimal; Mongoose 8 uses modern defaults
        serverSelectionTimeoutMS: 5000
      })
      .then((mongooseInstance) => {
        console.log("✅ MongoDB Connected");
        return mongooseInstance;
      })
      .catch((err) => {
        console.error("❌ DB connection error:", err.message);
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

module.exports = connectDB;