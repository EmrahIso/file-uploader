import { Router } from 'express';

import {
  folderValidationRules,
  validateFolder,
} from '../validators/folderValidator.js';

import {
  folderQueryValidator,
  validateFolderQuery,
} from '../validators/folderQueryValidator.js';

import {
  getFolderUpload,
  postFolderUpload,
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

export { folderRouter };
