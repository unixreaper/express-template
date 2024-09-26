// utils/validation/loginValidation.js
const Joi = require('joi');

const loginValidationSchema = Joi.object({
  username: Joi.string().max(50).required(), // Username must be a string and is required
  password: Joi.string().min(2).required(),  // Password must be at least 2 characters long and is required
});

module.exports = loginValidationSchema;
