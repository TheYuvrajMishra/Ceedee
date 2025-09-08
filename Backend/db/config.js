const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // The useNewUrlParser and useUnifiedTopology options are deprecated
    // in recent versions of Mongoose and are no longer needed.
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ DB connection error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;