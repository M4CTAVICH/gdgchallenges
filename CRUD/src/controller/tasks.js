import Task from "../models/task.js";
import User from "..//models/user.js";

export async function getTasks(req, res) {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;
    console.log(search);

    const tasks = await Task.find({
      name: {
        $regex: search,
        $options: "i",
      },
    })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    const count = await Task.countDocuments({});

    if (!tasks.length) {
      return res.status(404).json({ message: "No tasks found" });
    }

    res
      .status(200)
      .json({ tasks, totalPages: Math.ceil(count / limit), count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function createTask(req, res) {
  try {
    const { name, completed, userId } = req.body;
    if (!userId) {
      return res.status(404).json({ message: "Id required" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const task = new Task({ name, completed, user: userId });
    await task.save();

    res.status(201).json({ message: "task created succesfully", task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function updateTask(req, res) {
  try {
    const { id } = req.params;
    const { name, completed } = req.body;
    const task = await Task.findByIdAndUpdate(
      id,
      { name, completed },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function deleteTask(req, res) {
  try {
    const { id } = req.params;
    console.log(id);
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    console.log(id);
    res.status(204).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getTask(req, res) {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "No tasks found" });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getTaskByUser(req, res) {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const task = await Task.find({ user: userId }).populate(
      "user",
      "name email"
    );

    if (!task.length) {
      return res.status(404).json({ message: "No tasks found" });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
