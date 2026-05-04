import { body, validationResult } from 'express-validator';

import { isFolderNameTaken, getFolderById } from '../services/folderService.js';

const folderValidationRules = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required.')
    .isLength({ min: 2, max: 20 })
    .withMessage('Name must be between 2 and 20 characters long.')
    .matches(/^[^<>:"/\\|?*]+$/)
    .withMessage('Invalid characters'),
];

async function validateFolder(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const parentId = req.query.folder === '' ? null : req.query.folder;

    const parent = await getFolderById({ id: parentId });

    return res.status(400).render('upload-folder', {
      errors: errors.array().map((error) => ({
        field: error.path,
        msg: error.msg,
      })),
      oldInput: req.body,
      parentId: parentId,
      parentFolderName: parent === null ? null : parent.name,
    });
  }

  next();
}

export { folderValidationRules, validateFolder };
