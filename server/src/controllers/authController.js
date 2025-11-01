// src/controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const sendEmail = require('../config/sendEmail'); // Import the utility

// ... (your existing generateToken, register, login, getProfile functions) ...
const generateToken = (userId, userRole) => {
  return jwt.sign({ id: userId, role: userRole }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

exports.register = async (req, res, next) => {
  res.status(403).json({ message: 'Registration is not allowed.' });
};

exports.login = async (req, res, next) => {
  // ... (your existing login logic) ...
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid credentials' });

    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Not an admin.' });
    }
    
    const token = generateToken(user._id, user.role);
    res.json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

exports.getProfile = async (req, res) => {
  res.json({
    message: 'Profile fetched successfully',
    user: req.user,
  });
};

// --- ADD THE 3 NEW FUNCTIONS BELOW ---

// @route   POST /api/auth/forgot-password
exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email, role: 'admin' });

    if (!user) {
      // Don't reveal if user exists. Send success message anyway.
      return res.status(200).json({ message: 'If an account with that email exists, a reset code has been sent.' });
    }

    // 1. Generate 5-digit code
    const resetCode = Math.floor(10000 + Math.random() * 90000).toString();
    
    // 2. Set expiration (10 minutes)
    const resetExpires = Date.now() + 10 * 60 * 1000; 

    user.resetPasswordCode = resetCode;
    user.resetPasswordExpires = resetExpires;
    await user.save();

    // 3. Send email
    const message = `You are receiving this email because you (or someone else) have requested the reset of a password for your admin account.
Your 5-digit reset code is:

${resetCode}

This code will expire in 10 minutes.
If you did not request this, please ignore this email.`;

    await sendEmail({
      email: user.email,
      subject: 'Admin Password Reset Code',
      message,
    });

    res.status(200).json({ message: 'A reset code has been sent to your email.' });
  } catch (error) {
    // Clear token if email sending fails
    if (req.body.email) {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        user.resetPasswordCode = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();
      }
    }
    console.error(error);
    next(new Error('Email could not be sent. Please try again.'));
  }
};


// @route   POST /api/auth/verify-code
exports.verifyCode = async (req, res, next) => {
  try {
    const { email, code } = req.body;

    const user = await User.findOne({
      email: email,
      resetPasswordCode: code,
      resetPasswordExpires: { $gt: Date.now() }, // Check if not expired
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired code.' });
    }

    res.status(200).json({ message: 'Code verified successfully.' });
  } catch (error) {
    next(error);
  }
};


// @route   POST /api/auth/reset-password
exports.resetPassword = async (req, res, next) => {
  try {
    const { email, code, newPassword } = req.body;

    // 1. Find user by email, code, and valid expiration
    const user = await User.findOne({
      email: email,
      resetPasswordCode: code,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired code. Please try again.' });
    }

    // 2. Set new password (pre-save hook will hash it)
    user.password = newPassword;

    // 3. Clear the reset fields
    user.resetPasswordCode = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ message: 'Password reset successfully.' });
  } catch (error) {
    next(error);
  }
};