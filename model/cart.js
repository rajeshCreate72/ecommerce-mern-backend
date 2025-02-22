const mongoose = require("mongoose");

const cartCollection = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    items: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: "products", required: true },
            quantity: { type: Number, required: true },
        },
    ],
});

const cart = mongoose.model("cart", cartCollection);

module.exports = cart;
