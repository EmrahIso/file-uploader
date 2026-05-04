import { Router } from 'express';

import { getShowFolder } from '../controllers/showFolderController.js';
import {
  folderQueryValidator,
  validateFolderQuery,
} from '../validators/folderQueryValidator.js';

import { checkShowFolderOwnership } from '../middlewares/checkFolderOwnership.js';

import { isAuth } from '../middlewares/isAuth.js';

const showFolderRouter = Router();

showFolderRouter.get(
  '/',
  isAuth,
  folderQueryValidator,
  validateFolderQuery,
  checkShowFolderOwnership,
  getShowFolder
);

export { showFolderRouter };
