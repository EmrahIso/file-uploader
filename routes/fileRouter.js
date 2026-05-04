import { Router } from 'express';

import { upload } from '../config/multer.js';

import { isAuth } from '../middlewares/isAuth.js';
import {
  checkFolderOwnership,
  checkFolderOwnershipByFile,
} from '../middlewares/checkFolderOwnership.js';

import { checkFileOwnership } from '../middlewares/checkFileOwnership.js';

import { validateUpload } from '../middlewares/uploadValidator.js';

import {
  folderQueryValidator,
  validateFileQuery,
} from '../validators/folderQueryValidator.js';

import {
  fileQueryValidator,
  validateFileQueryParam,
} from '../validators/fileQueryValidator.js';

import {
  fileValidationRules,
  validateFile,
} from '../validators/fileValidator.js';

import {
  fileDetailsValidationRules,
  validateFileDetails,
} from '../validators/fileDetailsRouteValidator.js';

import {
  postFileUpload,
  getFileUpload,
  getFileDetails,
  postFileDelete,
  getFileDownload,
} from '../controllers/fileController.js';

const fileRouter = Router();

fileRouter.get(
  '/',
  isAuth,
  folderQueryValidator,
  validateFileQuery,
  checkFolderOwnership,
  getFileUpload
);

fileRouter.get(
  '/:id',
  isAuth,
  fileDetailsValidationRules,
  validateFileDetails,
  checkFolderOwnershipByFile,
  getFileDetails
);

fileRouter.post(
  '/',
  isAuth,
  upload,
  validateUpload,
  fileValidationRules,
  validateFile,
  folderQueryValidator,
  validateFileQuery,
  checkFolderOwnership,
  postFileUpload
);

fileRouter.post(
  '/delete',
  isAuth,
  fileQueryValidator,
  validateFileQueryParam,
  checkFileOwnership,
  postFileDelete
);

fileRouter.get(
  '/download/:id',
  isAuth,
  fileDetailsValidationRules,
  validateFileDetails,
  checkFolderOwnershipByFile,
  getFileDownload
);

export { fileRouter };
