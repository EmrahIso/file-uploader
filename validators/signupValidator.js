import { body, validationResult } from 'express-validator';

import { getUserByUsername } from '../services/userService.js';

const signupValidationRules = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username is required.')
    .isLength({ min: 4, max: 20 })
    .withMessage('Username must be between 4 and 20 characters long.')
    .custom(async (value, { req }) => {
      const user = await getUserByUsername(value);

      if (user) {
        throw new Error('User already taken.');
      }
      return true;
    }),
  body('password')
    .notEmpty()
    .withMessage('Password is required.')
    .isLength({ min: 8, max: 20 })
    .withMessage('Password must be between 8 and 20 characters long.'),
  body('confirmPassword')
    .notEmpty()
    .withMessage('Confirm password is required.')
    .isLength({ min: 8, max: 20 })
    .withMessage('Password must be between 8 and 20 characters long.')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match.');
      }
      return true;
    }),
];

function validateSignup(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render('signup', {
      errors: errors.array().map((error) => ({
        field: error.path,
        msg: error.msg,
      })),
      oldInput: req.body,
    });
  }

  next();
}

export { signupValidationRules, validateSignup };
