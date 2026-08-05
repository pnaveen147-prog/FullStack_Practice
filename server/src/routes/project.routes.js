const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/authorize.middleware");
const projectController = require("../controllers/project.controller");

router.post(
  "/",
  authenticate,
  authorize("Admin", "Manager"),
  projectController.createProject,
);

router.get("/", authenticate, projectController.getProjects);

router.get("/:id", authenticate, projectController.getProject);

router.put(
  "/:id",
  authenticate,
  authorize("Admin", "Manager"),
  projectController.updateProject,
);

router.delete(
  "/:id",
  authenticate,
  authorize("Admin"),
  projectController.deleteProject,
);

module.exports = router;
