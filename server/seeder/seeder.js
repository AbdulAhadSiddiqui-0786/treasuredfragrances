require('dotenv').config(); // Make sure it finds your .env
const mongoose = require('mongoose');
const connectDB = require('../src/config/db'); // Path to your db config
const Product = require('../src/models/Product'); // Path to your Product model
const products = require('../data'); // The data.js file you copied

connectDB();

const importData = async () => {
  try {
    // Clear existing products
    await Product.deleteMany();

    // Insert the products from data.js
    // Note: The 'id' field from data.js will be ignored,
    // and MongoDB will automatically create a unique '_id'
    await Product.insertMany(products);

    console.log('✅ Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error importing data: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    console.log('✅ Data Destroyed Successfully!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error destroying data: ${error.message}`);
    process.exit(1);
  }
};

// This allows you to run the script from the command line
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}