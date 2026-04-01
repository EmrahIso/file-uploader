import { Router } from 'express';

import { getLogIn, postLogIn } from '../controllers/loginController.js';

import {
  loginValidationRules,
  validateLogin,
} from '../validators/loginValidator.js';

const loginRouter = Router();

loginRouter.get('/', getLogIn);

loginRouter.post('/', loginValidationRules, validateLogin, postLogIn);

export { loginRouter };
