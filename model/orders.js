const mongoose = require("mongoose");

const ordersCollection = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products",
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],
    totalPrice: {
        type: Number,
        required: true,
    },
    shippingAddress: {
        type: String,
        required: true,
    },
    orderDate: {
        type: Date,
        default: Date.now,
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "completed", "failed", "cancelled"],
        default: "pending",
    },
    orderStatus: {
        type: String,
        enum: ["pending", "processing", "shipped", "Delivered"],
        default: "pending",
    },
});

const orders = mongoose.model("orders", ordersCollection);

module.exports = orders;
