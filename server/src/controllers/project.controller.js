const projectService = require("../services/project.service");
const successResponse = require("../responses/successResponse");
const AppError = require("../errors/AppError");

const createProject = async (req, res) => {
  const project = await projectService.createProject({
    ...req.body,
    createdBy: req.user.id,
  });

  return successResponse(res, 201, "Project created successfully", project);
};

const getProjects = async (req, res) => {
  const { page = 1, limit = 10, search, status, priority } = req.query;

  const result = await projectService.getProjects({
    page,
    limit,
    search,
    status,
    priority,
  });

  return successResponse(
    res,
    200,
    "Projects fetched successfully",
    result.data,
    result.pagination,
  );
};

const getProject = async (req, res) => {
  const project = await projectService.getProjectById(req.params.id);

  if (!project) {
    throw new AppError("Project not found", 404);
  }

  return successResponse(res, 200, "Project fetched successfully", project);
};

const updateProject = async (req, res) => {
  const project = await projectService.updateProject(req.params.id, req.body);

  if (!project) {
    throw new AppError("Project not found", 404);
  }

  return successResponse(res, 200, "Project updated successfully", project);
};

const deleteProject = async (req, res) => {
  const project = await projectService.deleteProject(req.params.id);

  if (!project) {
    throw new AppError("Project not found", 404);
  }

  return successResponse(res, 200, "Project deleted successfully", null);
};

module.exports = {
  createProject,

  getProjects,

  getProject,

  updateProject,

  deleteProject,
};
