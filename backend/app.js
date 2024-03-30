const express = require("express");
const app = express();
const cors = require("cors");
require("./utils/mongoose_db");
const http = require("http");

const path = require("path");
const auth = require("./routes/auth");
const list = require("./routes/todo_list");

app.use(express.json());
app.use(cors(
    {
        origin:["https://todo-mern-stack-pi.vercel.app"],
        methods:["get", "post", "put", "delete"],
        credentials: true
    }
));

app.use("/api/r1", auth);
app.use("/api/r2", list);

app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname, "frontend", "build")));

    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
})

const server = http.createServer(app);

server.setTimeout(300000);

server.listen(3333, () => {
    console.log("Server Started");
});
