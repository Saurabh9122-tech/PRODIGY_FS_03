const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: String,
  rating: { type: Number, min: 0, max: 5 },
  comment: String,
}, { timestamps: true });

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: String,
  description: String,
  price: { type: Number, required: true },
  reviews: [reviewSchema],
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
