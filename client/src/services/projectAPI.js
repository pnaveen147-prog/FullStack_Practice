import axiosInstance from "../api/axios";

const PROJECT_BASE_URL = "/projects";

const getProjects = async (query = {}) => {
  const response = await axiosInstance.get(PROJECT_BASE_URL, {
    params: query,
  });

  return response.data;
};

const createProject = async (payload) => {
  const response = await axiosInstance.post(PROJECT_BASE_URL, payload);

  return response.data;
};

const updateProject = async (id, payload) => {
  const response = await axiosInstance.put(
    `${PROJECT_BASE_URL}/${id}`,
    payload,
  );

  return response.data;
};

const deleteProject = async (id) => {
  const response = await axiosInstance.delete(`${PROJECT_BASE_URL}/${id}`);

  return response.data;
};

export default {
  getProjects,

  createProject,

  updateProject,

  deleteProject,
};
