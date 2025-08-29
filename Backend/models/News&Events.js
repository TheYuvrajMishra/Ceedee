const mongoose = require("mongoose");

const NewsEventsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        enum: ["News", "Event"],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    location: {
        type: String,
        trim: true
    },
    image: {
        type: String, // store URL or path
        trim: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin" // Reference to admin who posted it
    },
    status: {
        type: String,
        enum: ["Draft", "Published", "Archived"],
        default: "Published"
    },
    tags: {
        type: [String],
        default: []
    }
}, { timestamps: true });

module.exports = mongoose.model("NewsEvent", NewsEventsSchema);
