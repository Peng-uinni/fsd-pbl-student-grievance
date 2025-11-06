const express = require('express');
const {
  createComplaint,
  getStudentComplaints,
  getAllComplaints,
  updateComplaintStatus
} = require('../controllers/ComplaintController');

const router = express.Router();

// Student routes
router.route('/').post(createComplaint); // File a new complaint
router.route('/me').get(getStudentComplaints); // View my complaints

// Admin routes
router.route('/all').get(getAllComplaints); // View all complaints
router.route('/:id/status').put(updateComplaintStatus); // Update status by ID

module.exports = router;