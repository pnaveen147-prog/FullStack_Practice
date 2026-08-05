const taskService = require("../services/task.service");
const successResponse = require("../responses/successResponse");
const AppError = require("../errors/AppError");

const createTask = async (req, res) => {
  const task = await taskService.createTask({
    ...req.body,
    createdBy: req.user.id,
  });

  return successResponse(res, 201, "Task created successfully", task);
};

const getTasks = async (req, res) => {
  const {
    page = 1,
    limit = 10,
    search,
    status,
    priority,
    project,
    assignedTo,
  } = req.query;

  const result = await taskService.getTasks({
    page,
    limit,
    search,
    status,
    priority,
    project,
    assignedTo,
  });

  return successResponse(
    res,
    200,
    "Tasks fetched successfully",
    result.data,
    result.pagination,
  );
};

const getTask = async (req, res) => {
  const task = await taskService.getTaskById(req.params.id);

  if (!task) {
    throw new AppError("Task not found", 404);
  }

  return successResponse(res, 200, "Task fetched successfully", task);
};

const updateTask = async (req, res) => {
  const task = await taskService.updateTask(req.params.id, req.body);

  if (!task) {
    throw new AppError("Task not found", 404);
  }

  return successResponse(res, 200, "Task updated successfully", task);
};

const deleteTask = async (req, res) => {
  const task = await taskService.deleteTask(req.params.id);

  if (!task) {
    throw new AppError("Task not found", 404);
  }

  return successResponse(res, 200, "Task deleted successfully", null);
};

module.exports = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
};
