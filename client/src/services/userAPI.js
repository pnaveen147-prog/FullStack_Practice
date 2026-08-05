import axiosInstance from "../api/axios";

const USER_BASE_URL = "/users";

const getUsers = async (query = {}) => {
  const cleanQuery = Object.fromEntries(
    Object.entries(query).filter(
      ([, value]) => value !== "" && value !== null && value !== undefined,
    ),
  );

  const response = await axiosInstance.get(USER_BASE_URL, {
    params: cleanQuery,
  });

  return response.data;
};

const getUserById = async (id) => {
  const response = await axiosInstance.get(`${USER_BASE_URL}/${id}`);

  return response.data;
};

const createUser = async (payload) => {
  const response = await axiosInstance.post(USER_BASE_URL, payload);

  return response.data;
};

const updateUser = async (id, payload) => {
  const response = await axiosInstance.put(`${USER_BASE_URL}/${id}`, payload);

  return response.data;
};

const deleteUser = async (id) => {
  const response = await axiosInstance.delete(`${USER_BASE_URL}/${id}`);

  return response.data;
};

export default {
  getUsers,

  getUserById,

  createUser,

  updateUser,

  deleteUser,
};
