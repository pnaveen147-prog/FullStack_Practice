const express = require("express");

const router = express.Router();

const userController = require("../controllers/user.controller");
const asyncHandler = require("../middleware/asyncHandler");
const validationMiddleware = require("../middleware/validation.middleware");
const {
  createUserSchema,
  paginationSchema,
} = require("../validators/user.validator");
const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/authorize.middleware");

router.post(
  "/",
  validationMiddleware(createUserSchema),
  asyncHandler(userController.createUser),
);
router.get(
  "/",
  authenticate,
  validationMiddleware(paginationSchema, "query"),
  asyncHandler(userController.getUsers),
);
router.get("/:id", authenticate, asyncHandler(userController.getUser));
router.put("/:id", authenticate, asyncHandler(userController.updateUser));
router.delete(
  "/:id",
  authenticate,
  authorize("Admin"),
  asyncHandler(userController.deleteUser),
);

module.exports = router;
