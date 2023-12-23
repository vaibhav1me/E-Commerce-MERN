const express = require("express");
const { fetchAllCategories, fetchCategory } = require("../controller/Category");

const router = express.Router()

router.route('/fetchAll').get(fetchAllCategories)
router.route('/:categoryName').get(fetchCategory)

module.exports = router