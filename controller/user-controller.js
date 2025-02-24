const Users = require("../model/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            return res.json({ message: "Email already exists" });
        }
        const salt = 10;
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new Users({ name, email, password });

        user.password = hashedPassword;
        await user.save();

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

        res.status(201).json({ message: "User created successfully", token: token });
    } catch (error) {
        res.status(500).json({ error: "Check the network", message: error.message });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Users.findOne({ email });
        if (!user) {
            return res.json({ message: "No user found, Register" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid password" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

        res.status(200).json({ message: "Login successful", token: token });
    } catch (error) {
        res.status(500).json({ error: "Check the network" });
    }
};

module.exports = { createUser, loginUser };
