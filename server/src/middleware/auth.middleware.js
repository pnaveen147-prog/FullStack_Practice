const jwt = require('jsonwebtoken');
const config = require('../config/jwt');
const AppError = require('../errors/AppError')

const authenticate = async (req,res, next) => {
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return next(
            new AppError(
                "Authentication required",
                401
            )
        )
    }
    const token = authHeader.split(' ')[1]
    try{
        const decoded =
        jwt.verify(
            token, config.accessSecret
        )
        req.user = decoded;
        next()
    } catch(error){
        next(
            new AppError(
                "Invalid or expired token",
                401
            )
        )
    }
}

module.exports = authenticate