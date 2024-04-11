const Task = require("../models/taskModel.js");
const User = require("../models/userModel.js");
const getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.status(200).json(tasks);
};

const setTasks = async (req, res) => {
  console.log(req.body);
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please enter tasks");
  }
  const task = await Task.create({ text: req.body.text, user: req.user.id });
  res.status(200).json(task);
};

const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(400);
    throw new Error("Task not found");
  }
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("No such user Found");
  }

  if (task.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User is not authorized to update");
  }
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedTask);
};

const deleteTask = async (req, res, next) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(400);
    throw new Error("Task not found");
  }
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("No such user found");
  }
  if(task.user.toString()!==user.id){
    res.status(401);
    throw new Error("User is not authorized to delete")
  }

  await Task.findByIdAndDelete(req.params.id);
  res.status(200).json({ id: req.params.id });
};

module.exports = { getTasks, setTasks, updateTask, deleteTask };
