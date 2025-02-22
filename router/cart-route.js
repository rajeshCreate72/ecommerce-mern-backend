const express = require("express");
const router = express.Router();

const { addToCart, updateQuntity, getAllCart } = require("../controller/cart-controller");
const authenticateUser = require("../config/authenticateUser");

router.post("/add-to-cart", authenticateUser, addToCart);
router.put("/update-quantity", authenticateUser, updateQuntity);
router.get("/get-cart", authenticateUser, getAllCart);

module.exports = router;
