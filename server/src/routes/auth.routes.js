const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth.controller");

const asyncHandler = require("../middleware/asyncHandler");

const validationMiddleware = require("../middleware/validation.middleware");

const { registerSchema, loginSchema } = require("../validators/auth.validator");
const authenticate = require("../middleware/auth.middleware");

router.post(
  "/register",
  validationMiddleware(registerSchema),
  asyncHandler(authController.register),
);

router.post(
  "/login",
  validationMiddleware(loginSchema),
  asyncHandler(authController.login),
);
router.post(
  "/logout",

  authenticate,

  authController.logout,
);

router.post("/reset-password", authController.resetPassword);

router.post("/refresh-token", asyncHandler(authController.refreshToken));
router.post("/forgot-password", authController.forgotPassword);

module.exports = router;
