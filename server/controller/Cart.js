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

const removeItem = async (req, res) => {
    try {
      const { userId, productId, removeAll} = req.body; // frontend will send an object with userId and productId
      const user = await User.findOne({ _id: userId });
      const cart = user.cart;
      const updatedCart = cart.map((cartItem) => {
        if (removeAll == true && cartItem.productId == productId) {
          return {};
        }
        else if (cartItem.productId == productId && cartItem.quantity == 1) {
          return {};
        }
        else if(cartItem.productId == productId){
          return {...cartItem, quantity: cartItem.quantity - 1}
        }
        else {
          return {...cartItem}
        }
      })
      const finalCart = updatedCart.filter((cartItem) => {
        return Object.keys(cartItem).length != 0
      })
      const updatedUser = await User.findOneAndUpdate({_id: userId}, {cart: finalCart}, {new: true})
      res.json(updatedUser)
    } catch (error) {
      res.json(error);
    }
}

const fetchCart = async (req, res) => {
  try {
    const {userId} = req.body;
    const user = await User.findOne({_id: userId})
    const cart = user.cart
    res.json(cart)
  } catch (error) {
    res.json(error)
  }
}

module.exports = {addToCart, removeItem, fetchCart}