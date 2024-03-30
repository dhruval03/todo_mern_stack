const router = require("express").Router();
const User = require("../models/user");
const List = require("../models/list");


// insert task 
router.post("/addTask", async (req, res) => {
    try {
        const { Title, Body, Deadline, _id } = req.body;

        if (!Title || !Body || !Deadline || !_id) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const user = await User.findOne({ _id });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const newTask = new List({ Title, Body, Deadline, user: user._id });
        await newTask.save();

        user.lists.push(newTask._id);
        await user.save();
        
        return res.status(200).json({ task: newTask });
    } catch (error) {
        console.error("Error adding task:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

// update task 

router.put("/updateTask/:id", async (req, res) => {
    try {
        const { Title, Body, Deadline, userid } = req.body;

        // console.log(userid);
        // Check if required fields are present
        if (!Title || !Body || !Deadline || !userid) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const user = await User.findById(userid); // Corrected query to find user by ID
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const task = await List.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        if (task.user.toString() !== user._id.toString()) {
            return res.status(403).json({ message: "You are not authorized to update this task" });
        }

        task.Title = Title;
        task.Body = Body;
        task.Deadline = Deadline;
        await task.save();

        return res.status(200).json({ message: "Task successfully updated" });
    } catch (error) {
        console.error("Error updating task:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});


// delete task 

router.delete("/deleteTask/:id", async (req, res) => {
    try {
        const taskId = req.params.id;
        const userId = req.body.userId; // Assuming the userId is sent in the request body
        console.log("Received user ID:", userId);
        // Find the task
        const task = await List.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Check if the task belongs to the current user
        if (!task.user.includes(userId)) {
            return res.status(403).json({ message: "You are not authorized to delete this task" });
        }

        // Delete the task
        await List.findByIdAndDelete(taskId);

        return res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error("Error deleting task:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});



// fetch task 

router.get("/getTask/:id", async (req, res) => {
    try {
        const userId = req.params.id;

        // Find tasks belonging to the specified user
        const tasks = await List.find({ user: userId });

        // Check if tasks were found
        if (!tasks || tasks.length === 0) {
            return res.status(404).json({ message: "No tasks found for the user" });
        }

        return res.status(200).json({ tasks });
    } catch (error) {
        console.error("Error retrieving tasks:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;