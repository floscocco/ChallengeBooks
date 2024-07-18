const { body } = require('express-validator');

const validateBook= [
    
    body('title')
        .notEmpty().withMessage('Title is required')
        .isLength({ min: 3 }).withMessage('Title must be at least 3 characters long'),
    
    body('cover')
        .notEmpty().withMessage('Cover is required')
        .isURL().withMessage('Cover must be a valid URL'),
    
    body('description')
        .notEmpty().withMessage('Description is required')
        .isLength({ min: 10 }).withMessage('Description must be at least 10 characters long')
    
];

module.exports= validateBook;