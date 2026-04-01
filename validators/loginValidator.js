import { body, validationResult } from 'express-validator';

const loginValidationRules = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username is required.')
    .isLength({ min: 4, max: 20 })
    .withMessage('Username must be between 4 and 20 characters long.'),
  body('password')
    .notEmpty()
    .withMessage('Password is required.')
    .isLength({ min: 8, max: 20 })
    .withMessage('Password must be between 4 and 20 characters long.'),
];

function validateLogin(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render('login', {
      errors: errors.array(),
      oldInput: req.body,
    });
  }

  next();
}

export { loginValidationRules, validateLogin };
