const express = require("express");
const router = express.Router()
const {addToCart, removeItem, fetchCart, emptyCart} = require('../controller/Cart')

router.route('/addToCart').patch(addToCart)
router.route('/removeItem').patch(removeItem)
router.route('/fetchCart').post(fetchCart)
router.route('/emptyCart').patch(emptyCart)

module.exports = router