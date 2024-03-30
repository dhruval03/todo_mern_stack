const mongoose = require("mongoose");

const conn = async (req, res) => {
    try {
        await mongoose
            .connect("mongodb+srv://todouser:todo123@todo-list.spz1fmz.mongodb.net/Todo-list-managemant")
            .then(() => {
                console.log("connection established");
            })
    } catch (error) {
        console.log("connection error: " + error);
    }
};
conn();