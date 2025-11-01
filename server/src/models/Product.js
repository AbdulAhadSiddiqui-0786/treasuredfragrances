const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0, 'Price cannot be negative'],
      default: 0,
    },
    img: {
      type: String,
      required: [true, 'Product image URL is required'],
    },
    imgKey: {
      type: String,
      required: [true, 'Product image key is required'],
    },
    category: {
      type: String,
      required: [true, 'Product category is required'],
      trim: true,
    },
    
    // --- THIS IS THE FIX ---
    isAvailable: { // CHANGED from 'stock'
      type: Boolean,
      default: true,  // RECOMMENDED: Changed from true
    },
    // --- END OF FIX ---

  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

module.exports = mongoose.model('Product', productSchema);