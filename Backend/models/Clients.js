const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
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
    phone: {
        type: String,
        trim: true
    },
    company: {
        type: String,
        trim: true
    },
    query: {
        type: String,
        required: true,
        trim: true
    },
    contactPreference: {
        type: String,
        enum: ["Email", "Phone", "WhatsApp", "Any"],
        default: "Any"
    },
    status: {
        type: String,
        enum: ["New", "In Progress", "Resolved"],
        default: "New"
    },
    notes: {
        type: String,
        trim: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Client", ClientSchema);
