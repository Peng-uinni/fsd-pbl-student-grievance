const express = require('express');
const multer = require('multer');
const path = require('path');

const {
  createComplaint,
  getStudentComplaints,
  getAllComplaints,
  updateComplaintStatus,
  getComplaintById
} = require('../controllers/ComplaintController');
const { protect, admin } = require('../middleware/Auth')

const router = express.Router();

// Simple disk storage for uploads (uploads/) TEMPORARY
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

// API test routes
router.route('/test')
.get((req, res)=>{
  res.send("[API TEST] Complaints GET");
})
.post((req, res)=>{
  res.send("[API TEST] Complaints POST")
});

// Student routes
router.route('/create').post(protect, upload.array('photos'), createComplaint); 
router.route('/me').get(protect, getStudentComplaints); 

// Admin routes
router.route('/:id/status').put(protect, admin, updateComplaintStatus); 

// Common routes
router.route('/all').get(protect, getAllComplaints); 
router.route("/:id").get(protect, getComplaintById);

module.exports = router;