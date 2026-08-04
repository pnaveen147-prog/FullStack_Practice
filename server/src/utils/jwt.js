const jwt = require('jsonwebtoken');
const config = require('../config/jwt')

const generateAccessToken = (user) => {
    return jwt.sign({
        id:user._id,
        role:user.role
    },
    config.accessSecret,
    {
        expiresIn: config.accessExpiresIn
    }
)
}

const generateRefreshToken = (user) => {
    return jwt.sign({
        id:user._id
    },
    config.refreshSecret,{
    expiresIn: config.refreshExpiresIn
    }
    )
}

module.exports = {
    generateAccessToken,
    generateRefreshToken
}