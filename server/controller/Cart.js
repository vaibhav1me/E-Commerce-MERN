const User = require("../models/User");

const addToCart = async (req, res) => {
    try {
        const {userId, productId} = req.body;   // frontend will send an object with userId and productId
        const user = await User.findOne({_id: userId})
        const cart = user.cart
        const productInCart = cart.map((cartItem, index) => {
            return {...cartItem, index}}).filter((cartItem) => {
            return cartItem.productId == productId;
        })
        if (productInCart.length == 0) {
        const updatedUser = await User.findOneAndUpdate({_id: userId}, {cart: [...cart, {productId: productId, quantity: 1}]}, {new: true})
        res.json(updatedUser)
        }
        else {
        const quantity = productInCart[0].quantity + 1;
        cart.splice(productInCart[0].index, 1);
        const updatedUser = await User.findOneAndUpdate({_id: userId}, {cart: [...cart, {productId, quantity}]}, {new: true})
        res.json(updatedUser)
        }
    } catch (error) {
        res.json(error)
    }
}

module.exports = {addToCart}