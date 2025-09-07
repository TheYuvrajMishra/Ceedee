const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AdminSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        trim: true 
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: { 
        type: String, 
        required: true, 
        minlength: 8 
    },
    role: { 
        type: String, 
        default: 'admin',
        enum: ['admin']
    },
    isActive: { 
        type: Boolean, 
        default: true 
    },
    lastLogin: {
        type: Date
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    }
}, { 
    timestamps: true 
});

// Hash password before saving
AdminSchema.pre('save', async function (next) {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) return next();
    
    try {
        // Hash password with cost of 12 (more secure than default 10)
        const saltRounds = 12;
        const salt = await bcrypt.genSalt(saltRounds);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Instance method to check password
AdminSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Instance method to update last login
AdminSchema.methods.updateLastLogin = function () {
    this.lastLogin = new Date();
    return this.save();
};

// Static method to find admin by email
AdminSchema.statics.findByEmail = function (email) {
    return this.findOne({ email: email.toLowerCase(), isActive: true });
};

module.exports = mongoose.model('Admin', AdminSchema);