const express = require('express');
const { 
    studentRegister, 
    studentLogin, 
    adminLogin, 
    adminRegister,
    logout
} = require('../controllers/authController');

const router = express.Router();

// Student routes
router.post('/student/register', studentRegister);
router.post('/student/login', studentLogin);

// Admin routes
router.post('/admin/login', adminLogin);
router.post('/admin/register', adminRegister); 

// Common routes
router.post('/logout', logout);

module.exports = router;