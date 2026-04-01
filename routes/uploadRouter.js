import { Router } from 'express';

import { getUpload } from '../controllers/uploadController.js';
import { isAuth } from '../middlewares/isAuth.js';

const uploadRouter = Router();

uploadRouter.get('/', isAuth, getUpload);

export { uploadRouter };
