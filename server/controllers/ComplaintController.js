const Complaint = require('../models/Complaint');
const Chat = require('../models/Chat');

const getUserContext = (req) => {
    if (!req.user) {
        throw new Error('User not authenticated');
    }
    return { 
        email: String(req.user.email), 
        isAdmin: req.role === 'admin' 
    };
};

exports.createComplaint = async (req, res) => {
    console.log("[POST /api/complaint/create]");
    try {
        // Use the new context utility
        const { email } = getUserContext(req);

        // Build complaint data from form fields. If files were uploaded via multer,
        // they will be available on req.files (array).
        const complaintData = {
            ...req.body,
            userEmail: email,
        };

        if (req.files && req.files.length) {
            // Store uploaded filenames (server-side path) for reference
            complaintData.photos = req.files.map(f => `/uploads/${f.filename}`);
        }

        // Include user ID in the complaint data
        const complaint = await Complaint.create(complaintData);
        const chat = await Chat.create({
            complaintId: complaint._id,
        });
        console.log("[CREATE COMPLAINT] SUCCESS");

        res.status(201).json({
            success: true,
            body: complaint
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

exports.getStudentComplaints = async (req, res) => {
    console.log("[POST /api/complaint/me]");
    try {
        const { email } = getUserContext(req);

        const complaints = await Complaint.find({ userEmail: email }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: complaints.length,
            body: complaints
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

exports.getAllComplaints = async (req, res) => {
    console.log("[POST /api/complaint/all]");
    try {
        const complaints = await Complaint.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: complaints.length,
            body: complaints
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

exports.updateComplaintStatus = async (req, res) => {
    console.log("[POST /api/complaint/:id/status]");
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


exports.getComplaintById = async (req, res) => {
    const _id = req.params.id;
    console.log("[GET /api/complaint/"+_id+"]");

    try{
        const complaint = await Complaint.findOne({_id});

        res.status(200).json({
            success: true,
            count: 1,
            body: complaint
        });
    } catch(err){
        console.error(err);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}