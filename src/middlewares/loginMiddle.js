const { body } = require('express-validator');

const validacionesLogin= [
    body('email')
        .notEmpty().withMessage('You must complete the email field').bail()
        .isEmail().withMessage('You must complete the email field with a valid email'),
    body('password')
        .notEmpty().withMessage('You must complete the password field')
];

module.exports= validacionesLogin;