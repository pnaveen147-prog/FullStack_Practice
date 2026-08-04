const bcrypt = require("bcrypt");

const User = require("../models/User");
const AppError = require('../errors/AppError');
const {generateAccessToken, generateRefreshToken} = require('../utils/jwt')

const registerUser = async (payload) => {
    const existingUser = await User.findOne({
        email: payload.email
    })
    if(existingUser){
        throw new AppError("Email already exists", 409)
    }
    const hashPassword = await bcrypt.hash(payload.password, 10)
    const userData = {
        ...payload, 
        password : hashPassword
    }
    const user = await User.create(userData)
    return user
}

const loginUser = async (payload) => {
    const user = await User.findOne({
        email: payload.email
    }).select("+password")
    if(!user){
        throw new AppError(
            "Invalid Email or Password",
            401
        )
    }
    const isPasswordValid = await bcrypt.compare(
        payload.password,
        user.password
    )
    if(!isPasswordValid){
        throw new AppError(
            'Inavlid email or password',
            401
        )
    }

    //old way of writing this
    // user.password = undefined
    // return user

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user)
    const userResponse = user.toObject();
    delete userResponse.password;

    return {
        user : userResponse,
        accessToken,
        refreshToken
    }
}



module.exports = {
    registerUser,
    loginUser
};