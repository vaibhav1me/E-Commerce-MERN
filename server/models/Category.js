const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
    categoryName: {
        type: String,
        required: [true, "This field is required"]
    },
    brands: {
        type: Array,
        default: ""
    },
    imageUrl: String
})

module.exports = mongoose.model('Category', CategorySchema)