const Project = require("../models/project.model");
const paginate = require("../utils/pagination");
const buildFilter = require("../utils/queryBuilder");

const createProject = async (payload) => {
  return await Project.create(payload);
};

const getProjects = async (query) => {
  const { page, limit, search } = query;

  const filter = buildFilter(query, ["status", "priority"]);

  if (search) {
    filter.$or = [
      {
        name: {
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

  const result = await paginate(Project, filter, page, limit);

  result.data = await Project.find(filter)
    .populate("createdBy", "firstName lastName email")
    .populate("members", "firstName lastName email")
    .sort({
      createdAt: -1,
    })
    .skip((page - 1) * limit)
    .limit(limit);

  return result;
};

const getProjectById = async (id) => {
  return await Project.findById(id)
    .populate("createdBy", "firstName lastName email")
    .populate("members", "firstName lastName email");
};

const updateProject = async (id, payload) => {
  return await Project.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
};

const deleteProject = async (id) => {
  return await Project.findByIdAndDelete(id);
};

module.exports = {
  createProject,

  getProjects,

  getProjectById,

  updateProject,

  deleteProject,
};
