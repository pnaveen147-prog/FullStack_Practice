const express = require("express");

const router = express.Router();

const authController = require('../controllers/auth.controller');

const asyncHandler = require('../middleware/asyncHandler');

const validationMiddleware = require('../middleware/validation.middleware');

const {registerSchema, loginSchema} = require('../validators/auth.validator');

router.post('/register',
validationMiddleware(registerSchema),
asyncHandler(authController.register)
)

router.post('/login', validationMiddleware(loginSchema),
asyncHandler(authController.login))


module.exports = router;