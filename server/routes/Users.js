const express = require("express");
const { createUser, loginUser, deleteUser, updateUser, getUser } = require("../controller/Users");
const router = express.Router();

router.route('/registerUser').post(createUser)
router.route('/loginuser').post(loginUser)
router.route('/:userId').get(getUser).delete(deleteUser).patch(updateUser)
module.exports = router