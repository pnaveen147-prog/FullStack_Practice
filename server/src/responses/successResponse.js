const successResponse = 
(res, statusCode = 200, message = 'Success', data = null, meta = null) => {
    const response = {
        success: true,
        message,
        data,
        meta
    };
    return res.status(statusCode).json(response);
};

module.exports = successResponse;