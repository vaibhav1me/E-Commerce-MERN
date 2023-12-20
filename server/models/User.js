const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'This field is required']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'This field is required']
    },
    password: {
        type: String,
        required: [true, 'This field is required']
    },
    role: {
        type: String,
        required: [true, 'This field is required']
    },
    mobile: {
        type: String,
        required: [true, 'This field is required']
    },
    address: {
        type: String,
        default: ""
    },
    cart: {
        type: Array,
        default: []
    }
})

module.exports = mongoose.model('User', UserSchema)