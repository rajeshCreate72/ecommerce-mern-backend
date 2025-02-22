const express = require("express");
const router = express.Router();
const { createOrder, getOrders, updateOrderStatus, updatePaymentStatus } = require("../controller/orders-controller");
const authenticateUser = require("../config/authenticateUser");

router.post("/create-order", authenticateUser, createOrder);
router.get("/get-orders", authenticateUser, getOrders);
router.put("/update-order-status", authenticateUser, updateOrderStatus);
router.put("/update-payment-status", authenticateUser, updatePaymentStatus);

module.exports = router;
