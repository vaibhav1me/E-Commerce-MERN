const express = require("express");
const router = express.Router()
const {addToCart} = require('../controller/Cart')

router.route('/addToCart').patch(addToCart)

module.exports = router