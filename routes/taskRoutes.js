const express = require("express");
const {
  getTasks,
  setTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getTasks);

router.post("/", protect, setTasks);

router.put("/:id", protect, updateTask);

router.delete("/:id", protect, deleteTask);
module.exports = router;
