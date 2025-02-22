const Order = require("../model/orders");
const Cart = require("../model/cart");
const Product = require("../model/products");

const createOrder = async (req, res) => {
    const { userId, address } = req.body;

    try {
        const cart = await Cart.findOne({ user: userId }).populate({
            path: "items.product",
            select: "price stock name",
        });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const orderItems = cart.items.map((item) => ({
            product: item.product,
            quantity: item.quantity,
        }));

        const totalPrice = cart.items.reduce((total, item) => {
            const product = item.product;
            return total + product.price * item.quantity;
        }, 0);

        const stockNot = orderItems.filter((item) => item.product.stock >= item.quantity);

        if (!isValid) {
            return res.status(400).json({ message: "Insufficient stock", stockNot });
        }

        await Promise.all(
            cart.items.map(async (item) => {
                await Product.findByIdAndUpdate(item.product._id, {
                    $inc: { stock: -item.quantity },
                });
            })
        );

        const order = new Order({
            user: userId,
            items: orderItems,
            totalPrice: Math.round(totalPrice * 100) / 100,
            shippingAddress: address,
        });

        await order.save();
        await order.populate("items.product");
        await order.populate("user");
        await Cart.findOneAndUpdate({ user: userId }, { $set: { items: [] } });
        res.status(201).json({ message: "Order created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error creating order", error: error.message });
    }
};

const getOrders = async (req, res) => {
    const { userId } = req.body;
    try {
        const orders = await Order.find({ user: userId }).populate("items.product").populate("user");
        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders" });
    }
};

const updateOrderStatus = async (req, res) => {
    const { orderId, status } = req.body;
    try {
        await Order.findByIdAndUpdate(orderId, { orderStatus: status }, { new: true });

        res.status(200).json({ message: "Order status updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating order status" });
    }
};

const updatePaymentStatus = async (req, res) => {
    const { orderId, status } = req.body;
    try {
        await Order.findByIdAndUpdate(orderId, { orderStatus: status }, { new: true });

        res.status(200).json({ message: "Order status updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating order status" });
    }
};

module.exports = { createOrder, getOrders, updateOrderStatus, updatePaymentStatus };
