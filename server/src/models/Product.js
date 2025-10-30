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
      // Matches the 'img' field from your frontend data
      type: String,
      required: [true, 'Product image URL is required'],
    },
    imgKey: {
      // Matches the 'imgKey' field from your frontend data
      type: String,
      required: [true, 'Product image key is required'],
    },
    category: {
      type: String,
      required: [true, 'Product category is required'],
      trim: true,
    },
    stock: {
      type: Boolean,
      default: true,
    },
    // You could add more fields later, e.g.:
    // reviews: [reviewSchema],
    // brand: { type: String, required: true }
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

module.exports = mongoose.model('Product', productSchema);