import express from "express";
import bodyParser from "body-parser";

import connectDB from "./src/config/db.js";

import taskRouter from "./src/routes/tasks.js";
import userRouter from "./src/routes/users.js";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/tasks", taskRouter);
app.use("/users", userRouter);

connectDB();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
