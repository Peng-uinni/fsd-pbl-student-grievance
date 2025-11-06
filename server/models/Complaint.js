const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
  // Complaint fields required by the student form
  subject: {
    type: String,
    required: [true, 'Please add a subject for the complaint'],
    trim: true,
    maxlength: [100, 'Subject cannot be more than 100 characters']
  },
  category: {
    type: String,
    required: [true, 'Please select a category'],
    enum: ['Academic', 'Administration', 'Hostel/Mess', 'Infrastructure', 'Disciplinary', 'Other'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a detailed description']
  },
  // Fields for tracking and authorization
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Resolved'],
    default: 'Pending'
  },
  attachments: { // Storing image file paths/URLs (not the files themselves)
    type: [String],
    default: []
  },
  // User who filed the complaint (Foreign Key/Reference)
  userId: {
    type: String, // Assuming a simple string ID from an auth system
    required: true,
  },
  userName: {
    type: String,
    default: 'Unknown User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Complaint', ComplaintSchema);