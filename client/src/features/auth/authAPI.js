import axiosInstance from "../../api/axios";

const AUTH_BASE_URL = "/auth";

export const login = async (credentials) => {
  const response = await axiosInstance.post(
    `${AUTH_BASE_URL}/login`,
    credentials,
  );

  return response.data?.data ?? response.data;
};

export const register = async (payload) => {
  const response = await axiosInstance.post(
    `${AUTH_BASE_URL}/register`,
    payload,
  );

  return response.data;
};

export const refreshToken = async (refreshToken) => {
  const response = await axiosInstance.post(`${AUTH_BASE_URL}/refresh-token`, {
    refreshToken,
  });

  return response.data;
};

const logout = async () => {
  const response = await axiosInstance.post("/auth/logout");

  return response.data;
};

export default {
  login,

  register,

  refreshToken,

  logout,
};
