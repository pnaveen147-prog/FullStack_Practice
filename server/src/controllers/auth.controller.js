const authService = require("../services/auth.service");
const successResponse = require("../responses/successResponse");

const register = async (req, res) => {
  const user = await authService.registerUser(req.body);
  return successResponse(res, 201, "User registerd Successfully", user);
};

const login = async (req, res) => {
  const user = await authService.loginUser(req.body);
  return successResponse(res, 200, "Login Successfull", user);
};

const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  const result = await authService.refreshAccessToken(refreshToken);

  return successResponse(
    res,

    200,

    "Access token generated successfully",

    result,
  );
};
const logout = async (req, res) => {
  await authService.logoutUser(req.user.id);

  return successResponse(
    res,

    200,

    "Logout successful",
  );
};

module.exports = {
  register,
  login,
  refreshToken,
  logout,
};
