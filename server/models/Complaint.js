const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
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
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Resolved'],
    default: 'Pending'
  },
  attachments: { 
    type: [String],
    default: []
  },

  userId: {
    type: String, 
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