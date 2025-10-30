const User = require('../models/User');
const Product = require('../models/Product'); // You'll need your Product model

// @desc    Get user's cart
// @route   GET /api/cart
// @access  Private
exports.getCart = async (req, res) => {
  try {
    // req.user.id comes from the authMiddleware
    const user = await User.findById(req.user.id).populate('cart.productId'); 
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // The 'populate' call automatically fetches the product details 
    // based on the 'ref: Product' in your schema.
    res.json(user.cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server Error' });
  }
};

// @desc    Add item to cart
// @route   POST /api/cart/add
// @access  Private
exports.addToCart = async (req, res) => {
  const { productId, quantity = 1 } = req.body;

  try {
    // Find the user
    const user = await User.findById(req.user.id);
    
    // Check if product exists (optional but good practice)
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Check if the product is already in the user's cart
    const existingItemIndex = user.cart.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (existingItemIndex > -1) {
      // If item exists, update its quantity
      user.cart[existingItemIndex].quantity += quantity;
    } else {
      // If item doesn't exist, add it to the cart
      user.cart.push({ productId, quantity });
    }

    // Save the updated user document
    await user.save();

    // Populate the cart to send back the full cart details
    const updatedUser = await User.findById(req.user.id).populate('cart.productId');

    res.status(200).json(updatedUser.cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server Error' });
  }
};

// ... You can add more controllers here for remove, updateQty, etc. ...
// For example, a "removeFromCart" controller:

// @desc    Remove item from cart
// @route   DELETE /api/cart/:productId
// @access  Private
exports.removeFromCart = async (req, res) => {
  const { productId } = req.params;

  try {
    const user = await User.findById(req.user.id);

    // Filter out the item to be removed
    user.cart = user.cart.filter(
      (item) => item.productId.toString() !== productId
    );

    await user.save();
    
    const updatedUser = await User.findById(req.user.id).populate('cart.productId');
    res.status(200).json(updatedUser.cart);
    
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server Error' });
  }
};


exports.updateCartItemQuantity = async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;

  // Validate quantity
  if (quantity < 1) {
    return res
      .status(400)
      .json({ error: 'Quantity must be at least 1. Use the remove button to delete.' });
  }

  try {
    const user = await User.findById(req.user.id);

    // Find the item in the cart
    const itemIndex = user.cart.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      // Item found, update its quantity
      user.cart[itemIndex].quantity = quantity;
      await user.save();
      
      // Send back the fully populated cart
      const updatedUser = await User.findById(req.user.id).populate(
        'cart.productId'
      );
      res.status(200).json(updatedUser.cart);
    } else {
      // Item not found
      return res.status(404).json({ error: 'Item not found in cart' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server Error' });
  }
};