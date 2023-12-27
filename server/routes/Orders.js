const express = require("express");
const { fetchOrders, createOrder, cancelOrder, fetchOrdersBySeller } = require("../controller/Order");
const router = express.Router()

router.route('/').post(createOrder).delete(cancelOrder)
router.route('/seller').post(fetchOrdersBySeller)
router.route("/:userId").post(fetchOrders);

module.exports = router