const express = require('express');
const {
  createComplaint,
  getStudentComplaints,
  getAllComplaints,
  updateComplaintStatus
} = require('../controllers/ComplaintController');
const { protect, admin } = require('../middleware/Auth')

const router = express.Router();

// Student routes
router.route('/').post(protect, createComplaint); 
router.route('/me').get(protect, getStudentComplaints); 

// Admin routes
router.route('/all').get(protect, admin, getAllComplaints); // View all complaints
router.route('/:id/status').put(protect, admin, updateComplaintStatus); // Update status by ID

module.exports = router;