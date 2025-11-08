const Complaint = require('../models/Complaint');

// --- Utility function to extract user context (MOCK) ---
// In a real application, this data would be attached to req.user by a 
// JWT verification middleware after decoding the Authorization: Bearer token.
// For this environment, we continue to rely on mock headers for context.
const getUserContext = (req) => {
    // Assume user ID is passed via header 'x-user-id' and role via 'x-user-role'
    const userId = req.headers['x-user-id'] || 'MOCK_STUDENT_ID';
    const role = req.headers['x-user-role'] || 'student';
    const isAdmin = role === 'admin';

    return { userId, isAdmin };
};

// @desc    File a new complaint
// @route   POST /api/complaints
// @access  Private (Student)
exports.createComplaint = async (req, res) => {
    try {
        // Use the new context utility
        const { userId } = getUserContext(req); 
        
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