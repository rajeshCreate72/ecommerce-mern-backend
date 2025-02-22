// const { product } = require("../constants");
const productsModel = require("../model/products");

const addProducts = async (req, res) => {
    const productArr = req.body;
    try {
        await productsModel.deleteMany({});
        await productsModel.insertMany(productArr);
        res.status(201).json({ message: "Products added successfully" });
    } catch (error) {
        console.error("Error adding products:", error);
        res.status(500).json({ message: "Error adding products", error: error.message });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await productsModel.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error: error.message });
    }
};

module.exports = { addProducts, getAllProducts };
