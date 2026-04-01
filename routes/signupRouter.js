import { Router } from 'express';

import { getSignUp, postSignUp } from '../controllers/signupController.js';

import {
  signupValidationRules,
  validateSignup,
} from '../validators/signupValidator.js';

const singUpRouter = Router();

singUpRouter.get('/', getSignUp);

singUpRouter.post('/', signupValidationRules, validateSignup, postSignUp);

export { singUpRouter };
