const { body } = require('express-validator');

const validateLogin= [
    
    body('email')
        .notEmpty().withMessage('Email is required').bail()
        .isEmail().withMessage('Please enter a valid email address'),

    body('password')
        .notEmpty().withMessage('Password is required')
        
];

module.exports= validateLogin;