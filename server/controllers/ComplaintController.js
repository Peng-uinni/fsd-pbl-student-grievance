// complaint_backend/controllers/complaintController.js
const Complaint = require('../models/Complaint');

// --- Helper function (Mock Authentication) ---
// In a real application, userId and isAdmin would come from an authentication middleware
const mockAuth = (req) => {
    // For demonstration, we'll use a placeholder user ID and role based on query/body
    const userId = req.headers['x-user-id'] || 'MOCK_STUDENT_ID';
    const isAdmin = req.headers['x-user-role'] === 'admin';
    return { userId, isAdmin };
};

// @desc    File a new complaint
// @route   POST /api/complaints
// @access  Private (Student)
exports.createComplaint = async (req, res) => {
    try {
        const { userId } = mockAuth(req); // Assume student is authenticated
        
        // Include user ID in the complaint data
        const complaint = await Complaint.create({
            ...req.body,
            userId,
        });

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
        const { userId } = mockAuth(req);

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
        const { isAdmin } = mockAuth(req);
        if (!isAdmin) {
            return res.status(403).json({ success: false, error: 'Access denied. Must be an administrator.' });
        }

        // Admin sees all complaints, ordered by latest first
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
        const { isAdmin } = mockAuth(req);
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