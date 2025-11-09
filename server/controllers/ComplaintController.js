const Complaint = require('../models/Complaint');

// Utility function to extract user context.
// Prefer authenticated user (req.user) set by the `protect` middleware.
// Fall back to the legacy headers if req.user is not present (backwards compatibility).
const getUserContext = (req) => {
    if (!req.user) {
        throw new Error('User not authenticated');
    }
    return { 
        userId: String(req.user._id || req.user.id), 
        isAdmin: req.role === 'admin' 
    };
};

// @desc    File a new complaint
// @route   POST /api/complaints
// @access  Private (Student)
exports.createComplaint = async (req, res) => {
    try {
        // Use the new context utility
        const { userId } = getUserContext(req);

        // Build complaint data from form fields. If files were uploaded via multer,
        // they will be available on req.files (array).
        const complaintData = {
            ...req.body,
            userId,
        };

        if (req.files && req.files.length) {
            // Store uploaded filenames (server-side path) for reference
            complaintData.photos = req.files.map(f => `/uploads/${f.filename}`);
        }

        // Include user ID in the complaint data
        const complaint = await Complaint.create(complaintData);

        console.log("[CREATE COMPLAINT] SUCCESS");

        res.status(201).json({
            success: true,
            data: complaint
        });
    } catch (error) {
        console.log("[CREATE COMPLAINT] FAIL");
        console.error(error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// @desc    Get all complaints for the logged-in student
// @route   GET /api/complaints/me
// @access  Private (Student)
exports.getStudentComplaints = async (req, res) => {
    try {
        const { userId } = getUserContext(req);

        const complaints = await Complaint.find({ userId }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: complaints.length,
            data: complaints
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// @desc    Get all complaints (Admin only)
// @route   GET /api/complaints/all
// @access  Private (Admin)
exports.getAllComplaints = async (req, res) => {
    try {
        const { isAdmin } = getUserContext(req);
        if (!isAdmin) {
            return res.status(403).json({ success: false, error: 'Access denied. Must be an administrator.' });
        }

        const complaints = await Complaint.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: complaints.length,
            data: complaints
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// @desc    Update complaint status (Admin only)
// @route   PUT /api/complaints/:id/status
// @access  Private (Admin)
exports.updateComplaintStatus = async (req, res) => {
    try {
        const { isAdmin } = getUserContext(req);
        if (!isAdmin) {
            return res.status(403).json({ success: false, error: 'Access denied. Must be an administrator.' });
        }

        const { status } = req.body;
        const complaint = await Complaint.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );

        if (!complaint) {
            return res.status(404).json({ success: false, error: 'Complaint not found' });
        }

        res.status(200).json({
            success: true,
            data: complaint
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};