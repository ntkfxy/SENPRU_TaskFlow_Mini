const express = require("express");
const router = express.Router();
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/task.controller");
const { protectedRoute } = require("../middlewares/auth.middleware");

router.get("/", protectedRoute, getTasks);
router.post("/", protectedRoute, createTask);
router.put("/:id", protectedRoute, updateTask);
router.delete("/:id", protectedRoute, deleteTask);

module.exports = router;
