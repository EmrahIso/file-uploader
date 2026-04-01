import { Router } from 'express';

import { postLogOut } from '../controllers/logoutController.js';
import { isAuth } from '../middlewares/isAuth.js';

const logoutRouter = Router();

logoutRouter.post('/', isAuth, postLogOut);

export { logoutRouter };
