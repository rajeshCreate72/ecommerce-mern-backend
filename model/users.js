const mongoose = require("mongoose");

const usersCollection = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        index: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const users = mongoose.model("users", usersCollection);

module.exports = users;
