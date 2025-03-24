const express = require("express");

const app = express();

let tasks = [
  { id: 1, name: "Task 1", description: "Task description", completed: false },
  { id: 2, name: "Task 2", description: "Task description", completed: false },
  { id: 3, name: "Task 3", description: "Task description", completed: false },
];
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ data: tasks, message: "Task list" });
});

app.get("/tasks/:taskId", (req, res) => {
  const { taskId } = req.params;
  const task = tasks.find((task) => task.id == taskId);
  if (!task) {
    return res.status(404).json({
      message: "Task not found",
    });
  }
  res.status(200).json({
    message: "Task retrieved successfully",
    task: task,
  });
});
app.post("/tasks", (req, res) => {
  const { name, description, completed = false } = req.body;

  if (!name) {
    return res.status(400).json({
      message: "Name is required",
    });
  }
  tasks.push({
    id: tasks.length + 1,
    name,
    description: description || "",
    completed: completed,
  });
  res.status(201).json({
    message: "Task created successfully",
    task: name,
    description: description || "",
    completed: completed,
  });
});
app.put("/tasks/:taskId", (req, res) => {
  const { taskId } = req.params;
  const { name, description, completed } = req.body;
  const task = tasks.map((task) => {
    if (task.id == taskId) {
      task.name = name;
      task.description = description;
      task.completed = completed;
    }
    return task;
  });
  const task = tasks.find((task) => task.id == taskId);
  if (!task) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  res.status(200).json({
    message: "User updated successfully",
    task: task,
  });
});
app.delete("/tasks/:taskId", (req, res) => {
  const { taskId } = req.params;
  tasks = tasks.filter((task) => task.id != taskId);
  const task = tasks.find((task) => task.id == taskId);
  if (!task) {
    return res.status(404).json({
      message: "Task not found",
    });
  }
  res.status(200).json({
    message: "Task deleted successfully",
  });
});
app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
