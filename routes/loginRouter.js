import { Router } from 'express';

import { getLogIn, postLogIn } from '../controllers/loginController.js';

import { requireGuest } from '../middlewares/requireGuest.js';

import {
  loginValidationRules,
  validateLogin,
} from '../validators/loginValidator.js';

const loginRouter = Router();

loginRouter.get('/', requireGuest, getLogIn);

loginRouter.post(
  '/',
  requireGuest,
  loginValidationRules,
  validateLogin,
  postLogIn
);

export { loginRouter };
