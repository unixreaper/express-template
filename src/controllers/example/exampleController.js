// Import library
const { v4: uuidv4 } = require('uuid'); // For generating unique user IDs
const jwt = require('jsonwebtoken'); // Import JWT
const Joi = require('joi'); // Import Joi for validation

// My config
const config = require('../../config/config.json')[process.env.NODE_ENV || 'development'];

// My module
const Hasher = require('../../utils/security/hashlib');

// My setting from config
const salt = config.encryption.hasher.salt;
const secretKey = config.encryption.hasher.secretkey;
const hasher = new Hasher(salt, secretKey);
const jwtSecretKey = config.encryption.jwt.secretkey;  // Assuming this is the correct location for the secret key

// Joi schema for input validation
const userSchema = Joi.object({
    f_name: Joi.string().min(2).max(30).required().messages({
        'string.base': 'First name should be a type of text',
        'string.empty': 'First name is required',
        'string.min': 'First name should have at least 2 characters',
        'string.max': 'First name should have at most 30 characters',
        'any.required': 'First name is required'
    }),
    l_name: Joi.string().min(2).max(30).required().messages({
        'string.base': 'Last name should be a type of text',
        'string.empty': 'Last name is required',
        'string.min': 'Last name should have at least 2 characters',
        'string.max': 'Last name should have at most 30 characters',
        'any.required': 'Last name is required'
    }),
    uname: Joi.string().alphanum().min(3).max(30).required().messages({
        'string.base': 'Username should be a type of text',
        'string.empty': 'Username is required',
        'string.alphanum': 'Username should contain only letters and numbers',
        'string.min': 'Username should have at least 3 characters',
        'string.max': 'Username should have at most 30 characters',
        'any.required': 'Username is required'
    }),
    password: Joi.string().min(6).required().messages({
        'string.base': 'Password should be a type of text',
        'string.empty': 'Password is required',
        'string.min': 'Password should have at least 6 characters',
        'any.required': 'Password is required'
    })
});

exports.exampleTest = async (req, res, next) => {
    const { f_name, l_name, uname, password } = req.body;

    // Validate the input using Joi
    const { error } = userSchema.validate({ f_name, l_name, uname, password });

    // If validation fails, return a 400 response with the error message
    if (error) {
        return res.status(400).json({
            error: error.details[0].message // Send the first Joi validation error message
        });
    }

    // Simulate successful creation of a user
    const tokenPayload = {
        uid: uuidv4(), // Generate a USER-ID
        roles: ['admin'],
        firstName: f_name,
        lastName: l_name, 
        username: uname
    };

    const jwtToken = jwt.sign(tokenPayload, jwtSecretKey, {
        expiresIn: '7d',  // Token will expire in 7 days
    });

    const hashedPassword = hasher.hash(password);

    console.log(`HASHED PASSWORD: ${hashedPassword}`);

    // Respond with the created user data and a 201 status
    return res.status(201).json({ jwt: jwtToken });
};


exports.examplePermission = async (req, res) => {
    try {
        // Extract the roles from the decoded JWT token
        const { roles } = req.user;

        // Check if the user has admin or superAdmin role
        if (roles.includes('admin') || roles.includes('superAdmin')) {
            return res.status(200).json({
                message: 'You are admin, you have access',
            });
        } else {
            // Fallback, should not happen if permission middleware is working correctly
            return res.status(403).json({ error: 'PERMISSION_DENIED' });
        }

    } catch (err) {
        console.error('ExampleTest Error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
