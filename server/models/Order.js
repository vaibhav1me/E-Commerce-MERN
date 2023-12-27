const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  // userId: String,
  // productId: {
  //   type: String,
  //   required: [true, "This field is required"],
  // },
  // quantity: {
  //   type: Number,
  //   required: [true, "This field is required"],
  // },
  status: {
    type: String,
    default: "Pending"
  },
  seller: String,
  price: Number,
  placedAt: Date,
  productImg: String,
  name: String
});

module.exports = mongoose.model('Order', OrderSchema)