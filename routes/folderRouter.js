import { Router } from 'express';

import {
  folderValidationRules,
  validateFolder,
} from '../validators/folderValidator.js';

import {
  folderQueryValidator,
  validateFolderQuery,
} from '../validators/folderQueryValidator.js';

import { checkFolderOwnership } from '../middlewares/checkFolderOwnership.js';

import {
  getFolderUpload,
  postFolderUpload,
  postFolderDelete,
} from '../controllers/folderController.js';

import { isAuth } from '../middlewares/isAuth.js';

const folderRouter = Router();

folderRouter.get(
  '/',
  isAuth,
  folderQueryValidator,
  validateFolderQuery,
  checkFolderOwnership,
  getFolderUpload
);

folderRouter.post(
  '/',
  isAuth,
  folderQueryValidator,
  validateFolderQuery,
  folderValidationRules,
  validateFolder,
  checkFolderOwnership,
  postFolderUpload
);

folderRouter.post(
  '/delete',
  isAuth,
  folderQueryValidator,
  validateFolderQuery,
  checkFolderOwnership,
  postFolderDelete
);

export { folderRouter };
