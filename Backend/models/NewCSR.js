const mongoose = require("mongoose");

const CSRSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ["Education", "Healthcare", "Environment", "Community Development", "Other"],
        default: "Other"
    },
    location: {
        type: String,
        trim: true
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date
    },
    budget: {
        type: Number
    },
    implementedBy: {
        type: String,
        trim: true
    },
    contactPerson: {
        name: { type: String, trim: true },
        email: { type: String, trim: true, lowercase: true },
        phone: { type: String, trim: true }
    },
    impact: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ["Planned", "Ongoing", "Completed"],
        default: "Planned"
    }
}, { timestamps: true });

module.exports = mongoose.model("CSR", CSRSchema);
