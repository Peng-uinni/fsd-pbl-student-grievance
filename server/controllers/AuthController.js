const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const Admin = require('../models/Admin');

const generateToken = (id, role) => {
    let expires = process.env.JWT_EXPIRES_IN || '7d';
    if (/^\d+$/.test(String(expires)) && parseInt(expires, 10) < 3600) {
        // Treat very small numeric values as accidental short expiry (e.g. 30s) -> use 7 days
        expires = '7d';
    }
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: expires,
    });
};

exports.studentRegister = async (req, res) => {
    console.log("[POST /api/auth/student/register]");
    
    const { email, password, name } = req.body;

    try {
        const studentExists = await Student.findOne({ email });

        if (studentExists) {
            return res.status(400).json({ success: false, error: 'Student already exists' });
        }

        const student = await Student.create({ email, password, name });

        if (student) {
            const token = generateToken(student._id, 'student');
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
            });

            res.status(201).json({
                success: true,
                user: {
                    id: student._id,
                    email: student.email,
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

exports.studentLogin = async (req, res) => {
    console.log("[POST /api/auth/student/login]");
    
    const { email, password } = req.body;

    try {
        const student = await Student.findOne({ email }).select('+password');

        if (student && (await student.matchPassword(password))) {
            const token = generateToken(student._id, 'student');
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 1000 * 60 * 60 * 24 * 7, //1week in ms
            });

            res.json({
                success: true,
                user: {
                    id: student._id,
                    email: student.email,
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

exports.adminLogin = async (req, res) => {
    console.log("[POST /api/auth/admin/login]");
    const { email, password } = req.body;

    try {
        const adminUser = await Admin.findOne({ email }).select('+password');

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
                    email: adminUser.email,
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

exports.adminRegister = async (req, res) => {
    console.log("[POST /api/auth/admin/register]");
    const { email, password, name } = req.body;

    try {
        const adminExists = await Admin.findOne({ email });

        if (adminExists) {
            return res.status(400).json({ success: false, error: 'Admin user already exists' });
        }

        const adminUser = await Admin.create({ email, password, name });

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
                    email: adminUser.email,
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

exports.logout = async (req, res) => {
    console.log("[POST /api/auth/logout]");
    console.log(req.cookie);
    try {
        res.clearCookie('token');
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};