const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Student = mongoose.Schema({
    email: { 
        type: String,
        required: true,
        unique: true,
        // trim: true,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
},{
    timestamps: true,
});

// Middleware to hash the password before saving
Student.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to compare entered password with hashed password
Student.methods.matchPassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Student', Student);