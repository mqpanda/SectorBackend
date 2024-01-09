import { body } from 'express-validator';

// Registration validation rules
export const registrationValidationRules = [
  body('firstName').notEmpty().withMessage('First name is required'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

// Authentication validation rules
export const authenticationValidationRules = [
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').notEmpty().withMessage('Password is required'),
];
