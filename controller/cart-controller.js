const Cart = require("../model/cart");

const addToCart = async (req, res) => {
    const { userId, productId, quantity = 1 } = req.body;

    try {
        let cart = await Cart.findOne({ user: userId }).populate("items.product").populate("user");

        if (!cart) {
            cart = new Cart({
                user: userId,
                items: [{ product: productId, quantity }],
            });
        } else {
            const existingItem = cart.items.find((item) => item.product.toString() === productId);
            if (!existingItem) {
                cart.items.push({ product: productId, quantity });
            }
        }
        await cart.save();
        await cart.populate("items.product");
        await cart.populate("user");
        res.status(201).json({ message: "Product added to cart successfully" });
    } catch (error) {
        res.status(500).json({ message: "Check network", error: error.message });
    }
};

const updateQuntity = async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
        const cart = await Cart.findOneAndUpdate(
            { user: userId, "items.product": productId },
            { $set: { "items.$.quantity": quantity } },
            { new: true }
        );

        await cart.save();
        await cart.populate("items.product");
        await cart.populate("user");
        res.status(200).json({ message: "Quantity updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating quantity" });
    }
};

const getAllCart = async (req, res) => {
    const { userId } = req.body;
    try {
        const cart = await Cart.findOne({ user: userId }).populate("items.product").populate("user");
        res.status(200).json({ cart });
    } catch (error) {
        res.status(500).json({ message: "Error fetching cart" });
    }
};

module.exports = { addToCart, updateQuntity, getAllCart };
