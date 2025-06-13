import { body, validationResult } from 'express-validator';

const validateRegister = [
  body('username')
    .trim()
    .notEmpty().withMessage('Please enter username')
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),

  body('email')
    .notEmpty().withMessage('Please enter email')
    .isEmail().withMessage('Email format is not valid'),

  body('password')
    .notEmpty().withMessage('Please enter password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Input not valid, please check and try again',
        errors: errors.array(),
      });
    }
    
    next();
  }
];

export default validateRegister;
