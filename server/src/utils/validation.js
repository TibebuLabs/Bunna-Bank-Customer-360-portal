const { body } = require('express-validator');

const registerValidation = [
    body('fullName')
        .trim()
        .notEmpty().withMessage('Full name is required')
        .isLength({ min: 2, max: 100 }).withMessage('Full name must be between 2 and 100 characters'),
    
    body('username')
        .trim()
        .notEmpty().withMessage('Username is required')
        .isLength({ min: 3, max: 50 }).withMessage('Username must be between 3 and 50 characters')
        .matches(/^[a-zA-Z0-9_]+$/).withMessage('Username can only contain letters, numbers, and underscores'),
    
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
        .matches(/^(?=.*[A-Za-z])(?=.*\d)/).withMessage('Password must contain at least one letter and one number'),
    
    body('role')
        .optional()
        .isIn(['officer', 'teller', 'supervisor']).withMessage('Invalid role selected')
];

const loginValidation = [
    body('username')
        .trim()
        .notEmpty().withMessage('Username is required'),
    
    body('password')
        .notEmpty().withMessage('Password is required')
];

module.exports = {
    registerValidation,
    loginValidation
};