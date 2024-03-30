const mongoose = require("mongoose");

const listschema = new mongoose.Schema({
    Title: {
        type: String,
        required: true,
    },
    Body: {
        type: String,
        required: true,
    },
    Deadline: {
        type: String, 
        required: true,
    },
    user: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User",
            required: true, 
        },
    ],
},
{
        collection: "Todo_Lists",
});

module.exports = mongoose.model("Todo_Lists", listschema,'Todo_Lists');