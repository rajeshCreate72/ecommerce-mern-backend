const mongoose = require("mongoose");

const cartCollection = mongoose.Schema({
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
});

const cart = mongoose.model("cart", cartCollection);

module.exports = cart;
