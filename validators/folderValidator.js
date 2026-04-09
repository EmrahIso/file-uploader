import { body, validationResult } from 'express-validator';

import { isFolderNameTaken } from '../services/folderService.js';

const folderValidationRules = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required.')
    .isLength({ min: 2, max: 20 })
    .withMessage('Name must be between 2 and 20 characters long.')
    .matches(/^[^<>:"/\\|?*]+$/)
    .withMessage('Invalid characters')
    .custom(async (value, { req }) => {
      const parentId = req.body.parentId || null;

      const isTaken = await isFolderNameTaken({
        name: value,
        parentId: parentId,
        userId: req.user.id,
      });

      if (isTaken) throw new Error('Name is already taken.');

      return true;
    }),
];

function validateFolder(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render('upload-folder', {
      errors: errors.array().map((error) => ({
        field: error.path,
        msg: error.msg,
      })),
      oldInput: req.body,
      parentFolderName: req.body.parentFolderName || null,
    });
  }

  next();
}

export { folderValidationRules, validateFolder };
