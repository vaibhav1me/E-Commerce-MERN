const express = require("express");
const router = express.Router()
const {addToCart, removeItem, fetchCart} = require('../controller/Cart')

router.route('/addToCart').patch(addToCart)
router.route('/removeItem').patch(removeItem)
router.route('/fetchCart').post(fetchCart)

module.exports = router