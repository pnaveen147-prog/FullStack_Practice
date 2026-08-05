const AppError = require("../errors/AppError");

const authorize = (...roles) => {
  return (req, res, next) => {
    console.log("role", req.user.role);
    if (!roles.includes(req.user.role)) {
      return next(new AppError("Access Denied", 403));
    }
    next();
  };
};

module.exports = authorize;
