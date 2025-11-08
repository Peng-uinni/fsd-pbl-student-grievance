const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Student = mongoose.Schema({
    userId: { 
        type: String,
        required: [true, 'Please add a user ID/Registration number'],
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        // select: false,
    },
    name: {
        type: String,
        required: [true, 'Please add a name'],
    },
}, {
    timestamps: true
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