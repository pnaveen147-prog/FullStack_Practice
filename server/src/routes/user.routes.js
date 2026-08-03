const express = require('express');

const router = express.Router();

const userController = require('../controllers/user.controller');
const asyncHandler = require('../middleware/asyncHandler');
const validationMiddleware = require('../middleware/validation.middleware')
const {createUserSchema, paginationSchema} = require('../validators/user.validator');

router.post('/', validationMiddleware(createUserSchema), asyncHandler(userController.createUser));
router.get('/', validationMiddleware(paginationSchema, 'query'), asyncHandler(userController.getUsers));
router.get('/:id', asyncHandler(userController.getUser));
router.put('/:id', asyncHandler(userController.updateUser));
router.delete('/:id', asyncHandler(userController.deleteUser));

module.exports = router;