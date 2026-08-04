const authService = require('../services/auth.service');
const successResponse = require('../responses/successResponse');

const register = async (req, res)=> {
    const user = await authService.registerUser(req.body);
    return successResponse(res, 201, "User registerd Successfully", user);
}

const login = async (req,res) => {
    const user = await authService.loginUser(req.body)
    return successResponse(res, 200, "Login Successfull", user)
}


module.exports = {
    register,
    login
}