const express = require('express');

const {
  getComplaintChat,
  createComplaintChat,
  deleteComplaintChat
} = require("../controllers/ChatController");
const { protect, admin } = require('../middleware/Auth');

// /api/chat
const router = express.Router();

// Routes for complaint chats
router.route("/complaint/:id")
.get(protect, getComplaintChat)
.post(protect, createComplaintChat)
.delete(protect, admin, deleteComplaintChat);

module.exports = router;