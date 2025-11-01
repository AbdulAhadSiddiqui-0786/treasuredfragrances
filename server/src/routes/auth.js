// src/routes/auth.js
const express = require('express');
const router = express.Router();
const { 
  login, 
  getProfile,
  forgotPassword,  // ADD
  verifyCode,      // ADD
  resetPassword    // ADD
} = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Public route for admin login
router.post('/login', login);

// --- ADD THESE 3 ROUTES ---
router.post('/forgot-password', forgotPassword);
router.post('/verify-code', verifyCode);
router.post('/reset-password', resetPassword);
// --- END OF ADDED ROUTES ---

// Protected route for the admin's profile
router.get('/profile', authMiddleware, getProfile);

module.exports = router;