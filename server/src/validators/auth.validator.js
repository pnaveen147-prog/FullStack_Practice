const Joi = require('joi');

const registerSchema = Joi.object({
    firstName: Joi.string()
    .min(2)
    .max(50)
    .required(),

    lastName: Joi.string()
    .min(2)
    .max(50)
    .required(),

    email: Joi.string()
    .email()
    .required(),

    password: Joi.string()
    .min(8)
    .required(),

    age: Joi.number()
    .integer()
    .min(18)
    .max(100)
    .required(),

    role: Joi.string()
    .valid('Admin', 'Manager', 'User')
    .default('User')
});

const loginSchema = Joi.object({
    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
                .required()
})

module.exports = {
    registerSchema,
    loginSchema
}