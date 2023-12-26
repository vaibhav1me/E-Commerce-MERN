const Product = require("../models/Product");
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
        // cart.splice(productInCart[0].index, 1);
        cart[productInCart[0].index] = { productId, quantity };
        // const updatedUser = await User.findOneAndUpdate({_id: userId}, {cart: [...cart, {productId, quantity}]}, {new: true})
        const updatedUser = await User.findOneAndUpdate({_id: userId}, {cart: cart}, {new: true})
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
    let cartValue= 0;
    const {userId} = req.body;
    const user = await User.findOne({_id: userId})
    const cart = user.cart
    var sentCart = [];
const fetchProduct = async (cartItem) => {
  const product = await Product.findOne({ _id: cartItem.productId });
  cartValue += cartItem.quantity * product.price;
  return {
    productId: product._id,
    quantity: cartItem.quantity,
    productImg: product.images[0],
    name: product.title,
    seller: product.seller,
    price: cartItem.quantity * product.price,
  };
};

sentCart = await Promise.all(cart.map((cartItem) => fetchProduct(cartItem)));
// console.log(sentCart)
res.json({sentCart, cartValue})

  // Promise.all(cart.map((cartItem) => fetchProduct(cartItem)))
  //   .then((results) => {
  //     sentCart = results;
  //     console.log(sentCart);
  //   })
  //   .catch((error) => {
  //     // Handle errors
  //     console.error(error);
  //   });

  // var sentCart = [];
  // let sentCart = await Promise.all(cart.map((cartItem) => {
  //   var product;
  //   const fetchProduct = async () => {product = await Product.findOne({_id: cartItem.productId})}
  //   fetchProduct()
  //   console.log(product)
  //   return {productId: product._id, quantity: cartItem.quantity, productImg: product.images[0], price: (cartItem.quantity)*product.price}
  // sentCart = [...sentCart, {productId: product._id, quantity: cartItem.quantity, productImg: product.images[0], price: (cartItem.quantity)*product.price}]
  // console.log(sentCart)
  // }))
  // res.json(cart);
  } catch (error) {
    res.json(error)
  }
}

const emptyCart = async (req, res) => {
  try {
    const {userId} = req.body
    const user = await User.findOneAndUpdate({_id: userId}, {cart: []}, {new: true})
    res.json(user)
  } catch (error) {
    res.json(error)
  }
}

module.exports = {addToCart, removeItem, fetchCart, emptyCart}