import { body, validationResult } from 'express-validator';

 const validateCurrency = [
    body('symbol')
        .trim()
        .notEmpty().withMessage('Please enter a symbol')
        .isLength({ min: 2, max: 5 }).withMessage('Symbol must be between 2 to 5 characters'),

    body('name')
        .trim()
        .notEmpty().withMessage('Please enter a name'),

    body('type')
        .trim()
        .notEmpty().withMessage('Please specify type')
        .isIn(['crypto', 'fiat']).withMessage('Type must be either "crypto" or "fiat"'),

    body('decimals')
        .notEmpty().withMessage('Please enter decimals')
        .isInt({ min: 0, max: 18 }).withMessage('Decimals must be an integer between 0 and 18'),

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
export default validateCurrency;
