const Category = require('../models/Category')
const Product = require('../models/Product')

const fetchAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({})
        res.json(categories)
    } catch (error) {
        res.json(error)
    }
}

const fetchCategory = async (req, res) => {
    try {
        const {categoryName} = req.params
        const products = await Product.find({category: categoryName})
        const category = await Category.findOne({categoryName: categoryName})
        const brands = category.brands
        res.json({products, brands})
    } catch (error) {
        res.json(error)
    }
}

module.exports = {fetchAllCategories, fetchCategory}