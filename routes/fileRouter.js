import { Router } from 'express';

const fileRouter = Router();

fileRouter.get('/', (req, res) => res.send('hello'));

export { fileRouter };
