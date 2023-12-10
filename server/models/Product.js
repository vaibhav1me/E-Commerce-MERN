const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "This field is required"],
  },
  price: {
    type: String,
    required: [true, "This field is required"],
  },
  stock: {
    type: Number,
    required: [true, "This field is required"],
  },
  seller: {
    type: String,
    required: [true, "This field is required"],
  },
  description: {
    type: String,
    required: [true, "This field is required"],
  },
  category: {
    type: String,
    required: [true, "This field is required"],
  },
  brand: {
    type: String,
    required: [true, "This field is required"],
  },
  images: {
    type: Array,
    default: []
  }
});

module.exports = mongoose.model("Product", ProductSchema);
