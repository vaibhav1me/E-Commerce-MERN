const express = require("express");
const { fetchOrders, createOrder, cancelOrder } = require("../controller/Order");
const router = express.Router()

router.route('/').get(fetchOrders).post(createOrder).delete(cancelOrder)

module.exports = router