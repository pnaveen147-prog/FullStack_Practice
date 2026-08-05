const Task = require("../models/task.model");
const paginate = require("../utils/pagination");
const buildFilter = require("../utils/queryBuilder");

const createTask = async (payload) => {
  return await Task.create(payload);
};

const getTasks = async (query) => {
  const { page, limit, search } = query;

  const filter = buildFilter(query, [
    "status",
    "priority",
    "project",
    "assignedTo",
  ]);

  if (search) {
    filter.$or = [
      {
        title: {
          $regex: search,
          $options: "i",
        },
      },
      {
        description: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  const result = await paginate(Task, filter, page, limit);

  result.data = await Task.find(filter)
    .populate("project", "name")
    .populate("assignedTo", "firstName lastName email")
    .populate("createdBy", "firstName lastName email")
    .sort({
      createdAt: -1,
    })
    .skip((page - 1) * limit)
    .limit(limit);

  return result;
};

const getTaskById = async (id) => {
  return await Task.findById(id)
    .populate("project", "name")
    .populate("assignedTo", "firstName lastName email")
    .populate("createdBy", "firstName lastName email");
};

const updateTask = async (id, payload) => {
  return await Task.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
};

const deleteTask = async (id) => {
  return await Task.findByIdAndDelete(id);
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
