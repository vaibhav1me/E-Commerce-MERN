const Product = require("../models/Product");

const createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create({ ...req.body });
    res.json(newProduct);
  } catch (error) {
    res.json(error);
  }
};

const getAllProducts = async (req, res) => {
  try {
    // console.log(req.headers.cookie)
    const allProducts = await Product.find({});
    res.json(allProducts)
  } catch (error) {
    res.json(error);
  }
};

const getProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findOne({ _id: productId });
    if (product) {
      // console.log(req.headers.cookie)
        res.json(product);
    }
    else {
        res.json({message: "No product with this id"})
    }
  } catch (error) {
    res.json(error);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findOneAndDelete({ _id: productId });
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.json(error);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findOneAndUpdate(
      { _id: productId },
      { ...req.body },
      { new: true }
    );
    res.json(product);
  } catch (error) {
    res.json(error);
  }
};
module.exports = {
  createProduct,
  getAllProducts,
  deleteProduct,
  getProduct,
  updateProduct,
};
