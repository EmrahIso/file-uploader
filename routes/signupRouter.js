import { Router } from 'express';

import { getSignUp, postSignUp } from '../controllers/signupController.js';

import { requireGuest } from '../middlewares/requireGuest.js';

import {
  signupValidationRules,
  validateSignup,
} from '../validators/signupValidator.js';

const singUpRouter = Router();

singUpRouter.get('/', requireGuest, getSignUp);

singUpRouter.post(
  '/',
  requireGuest,
  signupValidationRules,
  validateSignup,
  postSignUp
);

export { singUpRouter };
