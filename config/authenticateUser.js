const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "edgitify-assignment"; // Use an environment variable

const authenticateUser = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1]; // Extract token from `Bearer <token>`

    if (!token) {
        return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Attach decoded user data to `req.user`
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid Token" });
    }
};

module.exports = authenticateUser;
