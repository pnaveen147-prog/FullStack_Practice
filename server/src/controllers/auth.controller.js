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

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await authService.forgotPassword(email);

  return successResponse(
    res,

    200,

    "If the account exists, a password reset link has been sent.",
    user,
  );
};
const resetPassword = async (
  req,

  res,
) => {
  const {
    token,

    password,
  } = req.body;

  await authService.resetPassword(
    token,

    password,
  );

  return successResponse(
    res,

    200,

    "Password reset successfully",
  );
};

module.exports = {
  register,
  login,
  refreshToken,
  logout,
  forgotPassword,
  resetPassword,
};
