import { param, validationResult } from 'express-validator';

const fileDetailsValidationRules = [
  param('id')
    .trim()
    .notEmpty()
    .withMessage('If is required.')
    .isUUID()
    .withMessage('Id must be a valid UUID'),
];

async function validateFileDetails(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(errors['errors'][0].msg);
  }

  console.log('proslo');
  next();
}

export { fileDetailsValidationRules, validateFileDetails };
