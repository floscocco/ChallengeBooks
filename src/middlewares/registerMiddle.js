const { body } = require('express-validator');

const validateRegister = [
    
    body('name')
        .notEmpty().withMessage('Full name is required')
        .isLength({ min: 3 }).withMessage('Full name must be at least 3 characters long'),
    
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please enter a valid email address'),
    
    body('country')
        .notEmpty().withMessage('Country is required'),
    
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 4 }).withMessage('Password must be at least 4 characters long'),

    body('category')
        .notEmpty().withMessage('Category is required')

];

module.exports= validateRegister;