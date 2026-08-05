import axiosInstance from "../api/axios";

const TASK_BASE_URL = "/tasks";

const getTasks = async (query = {}) => {
  const cleanQuery = Object.fromEntries(
    Object.entries(query).filter(
      ([, value]) => value !== "" && value !== null && value !== undefined,
    ),
  );

  const response = await axiosInstance.get(TASK_BASE_URL, {
    params: cleanQuery,
  });

  return response.data;
};

const createTask = async (payload) => {
  const response = await axiosInstance.post(TASK_BASE_URL, payload);

  return response.data;
};

const updateTask = async (id, payload) => {
  const response = await axiosInstance.put(`${TASK_BASE_URL}/${id}`, payload);

  return response.data;
};

const deleteTask = async (id) => {
  const response = await axiosInstance.delete(`${TASK_BASE_URL}/${id}`);

  return response.data;
};

export default {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
