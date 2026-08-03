const User = require("../models/User");

const createUser = async (payload) => {
    return await User.create(payload);
};

const getUsers = async () => {
    return await User.find();
}

const getUserById = async (id) => {
    return await User.findById(id);
}

const updateUser = async (id, payload) => {
    return await User.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
}

const deleteUser = async (id) => {
    return await User.findByIdAndDelete(id);
}

module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
};