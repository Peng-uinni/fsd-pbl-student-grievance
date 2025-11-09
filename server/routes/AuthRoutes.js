const express = require('express');
const { 
    studentRegister, 
    studentLogin, 
    adminLogin, 
    adminRegister 
} = require('../controllers/authController');

const router = express.Router();

// Student routes
router.post('/student/register', studentRegister);
router.post('/student/login', studentLogin);
router.post('/logout', require('../controllers/authController').logout);

// Admin routes
router.post('/admin/login', adminLogin);
router.post('/admin/register', adminRegister); 

module.exports = router;