import { query, validationResult } from 'express-validator';

const fileQueryValidator = [
  query('file')
    .customSanitizer((value) => {
      return value === '' ? null : value;
    })
    .optional({ nullable: true })
    .isUUID()
    .withMessage('File Id is not in right format!')
    .bail(),
];

function validateFileQueryParam(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render('upload-file', {
      errors: errors.array().map((error) => ({
        field: error.path,
        msg: error.msg,
      })),
      parentId: null,
      parentFolderName: null,
      oldInput: req.body,
    });
  }

  next();
}

export { fileQueryValidator, validateFileQueryParam };
