const express = require("express");
const {
  createProduct,
  deleteProduct,
  updateProduct,
  getProduct,
  getAllProducts,
  getProductsBySeller,
} = require("../controller/Products");
const router = express.Router();

router.route("/").get(getAllProducts).post(createProduct);
router.route('/seller/:sellerName').get(getProductsBySeller)
router.route("/:productId").get(getProduct).delete(deleteProduct).patch(updateProduct);
module.exports = router;
