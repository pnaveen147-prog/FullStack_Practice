const User = require("../models/User");
const paginate = require("../utils/pagination");
const buildFilter = require("../utils/queryBuilder");

const createUser = async (payload) => {
  return await User.create(payload);
};

const getUsers = async (query) => {
  const { page, limit, search } = query;
  const filter = buildFilter(query, ["role", "age"]);
  if (search) {
    filter.$or = [
      { firstName: { $regex: search, $options: "i" } },
      { lastName: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }
  return paginate(User, filter, page, limit);
};

const getUserById = async (id) => {
  return await User.findById(id);
};

const updateUser = async (id, payload) => {
  const updatePayload = { ...payload };

  if (!updatePayload.password || updatePayload.password.trim() === "") {
    delete updatePayload.password;
  }

  return await User.findByIdAndUpdate(id, updatePayload, {
    new: true,
    runValidators: true,
  });
};

const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
