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
  getFolderUpload
);

folderRouter.post(
  '/',
  isAuth,
  folderValidationRules,
  validateFolder,
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

// /files?folder=c9207e8e-b1cc-4c7f-b48e-9525e93d2cda
// /files?folder=1736564a-191b-42e6-8048-9fed785e7dab
