import express from 'express';
import path from 'node:path';
import session from 'express-session';
import helmet from 'helmet';
import passport from 'passport';

import { fileURLToPath } from 'node:url';
import { config } from 'dotenv';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';

import { prisma } from './lib/prisma.js';

import { indexRouter } from './routes/indexRouter.js';
import { loginRouter } from './routes/loginRouter.js';
import { singUpRouter } from './routes/signupRouter.js';
import { logoutRouter } from './routes/logoutRouter.js';
import { uploadRouter } from './routes/uploadRouter.js';

import { isAuth } from './middlewares/isAuth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV !== 'production') {
  config();
}

const PORT = process.env.PORT || 8000;

const app = express();

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.set('trust-proxy', 1);

app.use(helmet());
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.SESSION_SECRET,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    },
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

import './config/passport.js';

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.user = req.user;

  next();
});

app.use('/', indexRouter);
app.use('/signup', singUpRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/upload', uploadRouter);

app.get('/health', isAuth, (req, res) => {
  res.send('You are authenticated! :)');
});

app.use((req, res) => {
  res.status(404).render('404');
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render('500');
});

app.listen(PORT, () => {});
