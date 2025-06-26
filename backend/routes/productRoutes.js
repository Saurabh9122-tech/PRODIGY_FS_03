const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET all products
router.get('/', async (req, res) => {
  const { keyword, sort, minPrice, maxPrice } = req.query;
  let filter = {};
  if (keyword) filter.name = { $regex: keyword, $options: 'i' };
  if (minPrice || maxPrice) filter.price = {};
  if (minPrice) filter.price.$gte = Number(minPrice);
  if (maxPrice) filter.price.$lte = Number(maxPrice);

  let query = Product.find(filter);
  if (sort === 'priceAsc') query = query.sort({ price: 1 });
  if (sort === 'priceDesc') query = query.sort({ price: -1 });

  const products = await query;
  res.json(products);
});

// GET single product by ID
router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) res.json(product);
  else res.status(404).json({ message: 'Product not found' });
});

// POST a review
router.post('/:id/reviews', async (req, res) => {
  const { user, rating, comment } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    product.reviews.push({ user, rating, comment });
    await product.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

module.exports = router;
