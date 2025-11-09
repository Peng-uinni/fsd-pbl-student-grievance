const express = require('express');
const multer = require('multer');
const path = require('path');
const {
  createComplaint,
  getStudentComplaints,
  getAllComplaints,
  updateComplaintStatus
} = require('../controllers/ComplaintController');
const { protect, admin } = require('../middleware/Auth')

const router = express.Router();

// Simple disk storage for uploads (uploads/)
const uploadDir = path.join(__dirname, '..', 'uploads');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, unique + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Student routes
router.route('/').post(protect, upload.array('photos'), createComplaint); 
router.route('/me').get(protect, getStudentComplaints); 

// Admin routes
router.route('/all').get(protect, admin, getAllComplaints); // View all complaints
router.route('/:id/status').put(protect, admin, updateComplaintStatus); // Update status by ID

module.exports = router;