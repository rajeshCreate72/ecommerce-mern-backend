const express = require("express");
const router = express.Router();

const authenticateUser = require("../config/authenticateUser");
const { createUser, loginUser } = require("../controller/user-controller");
const { addProducts, getAllProducts } = require("../controller/products-add");

// For user registration and login
router.post("/register", createUser);
router.post("/login", loginUser);

// Authenticate JWT
router.get("/authenticate", authenticateUser, (req, res) => {
    res.status(200).json({ message: "Authenticated successfully", user: req.user, login: true });
});

// For adding and getting products
router.post("/add-products", addProducts);
router.get("/get-products", getAllProducts);

module.exports = router;
