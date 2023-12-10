const express = require("express");
const {
  createProduct,
  deleteProduct,
  updateProduct,
  getProduct,
  getAllProducts
} = require("../controller/Products");
const router = express.Router();

router.route('/getAllProducts').get(getAllProducts)
router.route("/createProduct").post(createProduct);
router.route("/:productId").get(getProduct).delete(deleteProduct).patch(updateProduct);
module.exports = router;
