const ACCESS_TOKEN = "accessToken";

const REFRESH_TOKEN = "refreshToken";

export const setAccessToken = (token) => {
  localStorage.setItem(
    ACCESS_TOKEN,

    token,
  );
};

export const getAccessToken = () => {
  return localStorage.getItem(ACCESS_TOKEN);
};

export const removeAccessToken = () => {
  localStorage.removeItem(ACCESS_TOKEN);
};

export const setRefreshToken = (token) => {
  localStorage.setItem(
    REFRESH_TOKEN,

    token,
  );
};

export const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_TOKEN);
};

export const removeRefreshToken = () => {
  localStorage.removeItem(REFRESH_TOKEN);
};

export const clearStorage = () => {
  removeAccessToken();

  removeRefreshToken();
};
