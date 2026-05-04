import { body, validationResult } from 'express-validator';

import { getFolderById } from '../services/folderService.js';

const fileValidationRules = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required.')
    .isLength({ min: 5, max: 40 })
    .withMessage('Name must be between 5 and 40 characters long.')
    .matches(/^[^<>:"/\\|?*]+$/)
    .withMessage('Invalid characters'),
];

async function validateFile(req, res, next) {
  const errors = validationResult(req);

  const parentId = req.query.folder === '' ? null : req.query.folder;

  const parent = await getFolderById({ id: parentId });

  if (!errors.isEmpty()) {
    return res.status(400).render('upload-file', {
      errors: errors.array().map((error) => ({
        field: error.path,
        msg: error.msg,
      })),
      oldInput: req.body,
      parentId,
      parentFolderName: parent === null ? null : parent.name,
    });
  }

  next();
}

export { fileValidationRules, validateFile };
