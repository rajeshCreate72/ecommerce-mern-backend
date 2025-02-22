const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./config/db");

const app = express();

dotenv.config();
dbConnect();

// Middleware to parse JSON requests (optional)
app.use(express.json());

// Sample route
app.get("/", (req, res) => {
    res.send("This is a server for Ecommerce application!");
});

//api endpoints
app.use("/api/users", require("./router/user-route"));
app.use("/api/cart", require("./router/cart-route"));
app.use("/api/orders", require("./router/order-route"));

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
