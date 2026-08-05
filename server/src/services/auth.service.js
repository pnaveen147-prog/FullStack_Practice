const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const AppError = require("../errors/AppError");
const config = require("../config/jwt");
const { generateAccessToken, generateRefreshToken } = require("../utils/jwt");

const registerUser = async (payload) => {
  const existingUser = await User.findOne({
    email: payload.email,
  });
  if (existingUser) {
    throw new AppError("Email already exists", 409);
  }
  const hashPassword = await bcrypt.hash(payload.password, 10);
  const userData = {
    ...payload,
    password: hashPassword,
  };
  const user = await User.create(userData);
  return user;
};

const loginUser = async (payload) => {
  const user = await User.findOne({
    email: payload.email,
  }).select("+password");
  if (!user) {
    throw new AppError("Invalid Email or Password", 401);
  }
  const isPasswordValid = await bcrypt.compare(payload.password, user.password);
  if (!isPasswordValid) {
    throw new AppError("Inavlid email or password", 401);
  }

  //old way of writing this
  // user.password = undefined
  // return user

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  user.refreshToken = refreshToken;
  await user.save();
  const userResponse = user.toObject();
  delete userResponse.password;
  delete userResponse.refreshToken;

  return {
    user: userResponse,
    accessToken,
    refreshToken,
  };
};

const refreshAccessToken = async (refreshToken) => {
  if (!refreshToken) {
    throw new AppError("Refresh token is required", 401);
  }

  let decoded;

  try {
    decoded = jwt.verify(refreshToken, config.refreshSecret);
  } catch (error) {
    throw new AppError("Invalid or expired refresh token", 401);
  }

  const user = await User.findById(decoded.id);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (user.refreshToken !== refreshToken) {
    throw new AppError("Refresh token is invalid", 401);
  }

  //   const accessToken = generateAccessToken(user);
  const newRefreshToken = generateRefreshToken(user);
  user.refreshToken = newRefreshToken;
  await user.save();
  const accessToken = generateAccessToken(user);

  return {
    accessToken,
    refreshToken: newRefreshToken,
  };
};

const logoutUser = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  user.refreshToken = null;

  await user.save();

  return;
};

module.exports = {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
};
