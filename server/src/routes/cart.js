const express = require('express');
const router = express.Router();
const { getCart, addToCart, removeFromCart, updateCartItemQuantity,} = require('../controllers/cartController');

// Note: The authMiddleware will be applied in server.js,
// so all routes in this file are automatically protected.

// GET /api/cart
router.get('/', getCart);

// POST /api/cart/add
router.post('/add', addToCart);

// DELETE /api/cart/:productId
router.delete('/:productId', removeFromCart);

router.put('/update/:productId', updateCartItemQuantity);

// You can add more routes here (e.g., PUT for quantity update)

module.exports = router;