const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const Admin = require('../models/Admin');

/**
 * @function protect
 * @description Middleware to ensure the user is logged in (authenticated) and populates req.user and req.role.
 * @description It checks for a JWT in the 'Authorization' header.
 */
const protect = async (req, res, next) => {
    let token;

    // Check Authorization header first (Format: "Bearer <token>")
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    // If no header token, try cookie (for persistent login)
    if (!token && req.cookies && req.cookies.token) {
        token = req.cookies.token;
    }

    if (!token) {
        return res.status(401).json({ success: false, error: 'Not authorized, no token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Determine role and fetch user details without password
        if (decoded.role === 'student') {
            req.user = await Student.findById(decoded.id).select('-password');
            req.role = 'student';
        } else if (decoded.role === 'admin') {
            req.user = await Admin.findById(decoded.id).select('-password');
            req.role = 'admin';
        }

        if (!req.user) {
            return res.status(401).json({ success: false, error: 'User not found or token invalid' });
        }

        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ success: false, error: 'Not authorized, token failed' });
    }
};

/**
 * @function admin
 * @description Middleware to restrict access only to admins. Must be used after `protect`.
 */
const admin = (req, res, next) => {
    if (req.role === 'admin') {
        next();
    } else {
        return res.status(403).json({ success: false, error: 'Not authorized as an admin' });
    }
};

module.exports = { protect, admin };