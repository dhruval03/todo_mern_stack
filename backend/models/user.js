const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
    emailID: {
        type: String,
        required: true,
        unique: true,
    },
    userName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    lists: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Todo_Lists",
        },
    ],
},
    {
        collection: "Users",
    });

module.exports = mongoose.model("User", userschema,'Users');