// seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/producttemp'); // ✅ Make sure filename is productModel.js
const products = require('./products.json'); // ✅ Create this JSON with products

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('Products seeded');
    process.exit();
  })
  .catch(err => {
    console.error('Seeding error:', err);
    process.exit(1);
  });
