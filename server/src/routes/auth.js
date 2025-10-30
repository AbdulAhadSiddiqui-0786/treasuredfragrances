const express = require('express');
const router = express.Router();
const { register, login, getProfile } = require('../controllers/authController');

// FIX: Import the middleware function directly (not destructuring)
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected route example
// FIX: Use the imported 'authMiddleware' function (this was line 11)
router.get('/profile', authMiddleware, getProfile);

module.exports = router;