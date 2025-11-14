const mongoose = require('mongoose');

const Chat = mongoose.Schema({
  complaintId: {
    type: String,
    required: true,
  },
  logs: {
    type: [],
    default: [],
  }
},{
  timestamps: true
});

module.exports = mongoose.model('Chat', Chat);