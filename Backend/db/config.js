const mongoose = require("mongoose");

// db/config.js
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ DB connection error:", err.message);
    // THROW an error instead of exiting
    throw new Error('Failed to connect to MongoDB'); 
  }
};

module.exports = connectDB;