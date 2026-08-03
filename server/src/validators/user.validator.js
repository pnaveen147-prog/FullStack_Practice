const joi = require('joi');

const createUserSchema = joi.object({
    firstName: joi.string().min(2)
    .max(50)
    .required(),

    lastName: joi.string()
    .min(2)
    .max(50)
    .required(),

    email: joi.string()
    .email()
    .required(),

    age: joi.number()
    .min(18)
    .max(100)
    .required(),
    
    role: joi.string()
    .valid('Admin', 'Manager', 'User')
    .default('User')
});

const paginationSchema = joi.object({
    page: joi.number()
    .integer()
    .min(1)
    .default(1),

    limit: joi.number()
    .integer()
    .min(1)
    .max(100)
    .default(10),

    search: joi.string()
            .allow('')
            .default(''),

    role: joi.string()
    .valid('Admin', 'Manager', 'User')
    .optional(),

    age: joi.number()
    .integer()
    .min(18)
    .max(100)
    .optional()
});

module.exports = {
    createUserSchema,
    paginationSchema
};
