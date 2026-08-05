const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/authorize.middleware");
const taskController = require("../controllers/task.controller");

router.post(
  "/",
  authenticate,
  authorize("Admin", "Manager"),
  taskController.createTask,
);

router.get("/", authenticate, taskController.getTasks);

router.get("/:id", authenticate, taskController.getTask);

router.put(
  "/:id",
  authenticate,
  authorize("Admin", "Manager"),
  taskController.updateTask,
);

router.delete(
  "/:id",
  authenticate,
  authorize("Admin"),
  taskController.deleteTask,
);

module.exports = router;
