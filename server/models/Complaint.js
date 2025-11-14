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
  department: {
    type: String,
    required: true,
    enum: ['CSE']
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
  watchers: {
    //for multiple people with the same problem
    type: [String],
    default: []
  },

  userEmail: {
    type: String, 
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

ComplaintSchema.methods.addWatcher = async (watcherEmail) => {
  this.watchers.push(watcherEmail);
}

ComplaintSchema.methods.updateStatus = async (updatedStatus) => {
  this.status = updatedStatus;
}

module.exports = mongoose.model('Complaint', ComplaintSchema);