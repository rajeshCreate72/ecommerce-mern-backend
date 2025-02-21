const { createUser, loginUser } = require("../controller/user-controller");
const authenticateUser = require("../config/authenticateUser");
const express = require("express");
const users = require("../model/users");
const router = express.Router();

// For user registration and login
router.post("/register", createUser);
router.post("/login", loginUser);

// Authenticate JWT
router.post("/authenticate", authenticateUser, (req, res) => {
    res.status(200).json({ message: "Authenticated successfully", user: req.user });
});

module.exports = router;
