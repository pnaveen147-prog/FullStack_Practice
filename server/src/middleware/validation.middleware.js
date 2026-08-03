const AppError = require('../errors/AppError');

const validationMiddleware = (schema, property='body') => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req[property], { abortEarly: false });
        if (error) {
            const errors = error.details.map(detail => detail.message);
            return next(new AppError('Validation Error', 400, errors));
        }
        req[property] = value; // Assign the validated value back to the request object
        next();
    };
};


module.exports = validationMiddleware;