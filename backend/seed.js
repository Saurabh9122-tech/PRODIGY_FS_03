require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/producttemp');
const products = require('./products.json');

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    return Product.deleteMany({});
  })
  .then(() => {
    return Product.insertMany(products);
  })
  .then(() => {
    console.log('Sample products inserted!');
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error('Error inserting products:', err);
    mongoose.disconnect();
  });
