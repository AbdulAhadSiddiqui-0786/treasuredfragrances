// Create a new file at:
// src/routes/productRoutes.js

const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProductByName, // Add this
} = require('../controllers/productController'); // Adjust path if needed

// Public routes for fetching products
// router.get('/', getAllProducts);
// router.get('/:id', getProductById);
router.get('/name/:name', getProductByName);
router.route("/").get(getProducts).post(addProduct);
router.route("/:id").put(updateProduct).delete(deleteProduct);

module.exports = router;