const mongoose = require("mongoose");

const CareerApplicationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    career: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Career",
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("CareerApplication", CareerApplicationSchema);