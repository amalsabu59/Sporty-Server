const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  img: {
    type: [String],
  },
  categories: {
    type: [String],
  },
  size: {
    type: [String],
  },
  price: {
    type: Number,
    required: true,
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  rating: [],
  reviews: [],
});

module.exports = mongoose.model("Products", ProductSchema);
