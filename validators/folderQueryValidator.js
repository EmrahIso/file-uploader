import { query, validationResult } from 'express-validator';

const folderQueryValidator = [
  query('folder')
    .customSanitizer((value) => {
      return value === '' ? null : value;
    })
    .optional({ nullable: true })
    .isUUID()
    .withMessage('Folder Id is not in right format!')
    .bail(),
];

function validateFolderQuery(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render('upload-folder', {
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

export { folderQueryValidator, validateFolderQuery };
