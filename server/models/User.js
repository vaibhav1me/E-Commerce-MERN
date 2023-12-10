const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'This field is required']
    },
    lastName: String,
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