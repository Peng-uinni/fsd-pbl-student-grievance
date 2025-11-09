const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const Admin = require('../models/Admin');

/**
 * @function generateToken
 * @description Creates and signs a JWT for the user.
 * @param {ObjectId} id - The user's MongoDB ID.
 * @param {string} role - The user's role ('student' or 'admin').
 * @returns {string} The signed JWT.
 */
const generateToken = (id, role) => {
    // If JWT_EXPIRES_IN is a small number (seconds), override to a safer default for persistence
    let expires = process.env.JWT_EXPIRES_IN || '7d';
    if (/^\d+$/.test(String(expires)) && parseInt(expires, 10) < 3600) {
        // Treat very small numeric values as accidental short expiry (e.g. 30s) -> use 7 days
        expires = '7d';
    }
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: expires,
    });
};

// @desc    Register a new student
// @route   POST /api/auth/student/register
// @access  Public
exports.studentRegister = async (req, res) => {
    const { userId, password, name } = req.body;

    try {
        const studentExists = await Student.findOne({ userId });

        if (studentExists) {
            return res.status(400).json({ success: false, error: 'Student already exists' });
        }

        const student = await Student.create({ userId, password, name });

        if (student) {
            const token = generateToken(student._id, 'student');
            // Set token as HttpOnly cookie for persistent sessions
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
            });

            res.status(201).json({
                success: true,
                user: {
                    id: student._id,
                    userId: student.userId,
                    name: student.name,
                    role: 'student',
                },
                token,
            });
        } else {
            res.status(400).json({ success: false, error: 'Invalid student data' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Authenticate student & get token
// @route   POST /api/auth/student/login
// @access  Public
exports.studentLogin = async (req, res) => {
    const { userId, password } = req.body;

    try {
        // Explicitly select the password field because it's set to select: false
        const student = await Student.findOne({ userId }).select('+password');

        if (student && (await student.matchPassword(password))) {
            const token = generateToken(student._id, 'student');
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 1000 * 60 * 60 * 24 * 7,
            });

            res.json({
                success: true,
                user: {
                    id: student._id,
                    userId: student.userId,
                    name: student.name,
                    role: 'student',
                },
                token,
            });
        } else {
            res.status(401).json({ success: false, error: 'Invalid student ID or password' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Authenticate admin & get token
// @route   POST /api/auth/admin/login
// @access  Public
exports.adminLogin = async (req, res) => {
    const { userId, password } = req.body;

    try {
        const adminUser = await Admin.findOne({ userId }).select('+password');

        if (adminUser && (await adminUser.matchPassword(password))) {
            const token = generateToken(adminUser._id, 'admin');
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 1000 * 60 * 60 * 24 * 7,
            });

            res.json({
                success: true,
                user: {
                    id: adminUser._id,
                    userId: adminUser.userId,
                    name: adminUser.name,
                    role: 'admin',
                },
                token,
            });
        } else {
            res.status(401).json({ success: false, error: 'Invalid admin ID or password' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    (OPTIONAL) Register a new admin (only needed for initial setup)
// @route   POST /api/auth/admin/register
// @access  Public (Should be restricted in production!)
exports.adminRegister = async (req, res) => {
    const { userId, password, name } = req.body;

    try {
        const adminExists = await Admin.findOne({ userId });

        if (adminExists) {
            return res.status(400).json({ success: false, error: 'Admin user already exists' });
        }

        const adminUser = await Admin.create({ userId, password, name });

        if (adminUser) {
            const token = generateToken(adminUser._id, 'admin');
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 1000 * 60 * 60 * 24 * 7,
            });

            res.status(201).json({
                success: true,
                user: {
                    id: adminUser._id,
                    userId: adminUser.userId,
                    name: adminUser.name,
                    role: 'admin',
                },
                token,
            });
        } else {
            res.status(400).json({ success: false, error: 'Invalid admin data' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Logout user (clear cookie)
// @route   POST /api/auth/logout
// @access  Public
exports.logout = async (req, res) => {
    try {
        res.clearCookie('token');
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};