import passport from 'passport';
import LocalStrategy from 'passport-local';
import { validatePassword } from '../utils/passwordUtils.js';
import { getUserById, getUserByUsername } from '../services/userService.js';

passport.use(
  new LocalStrategy(async (username, password, done) => {
    username = username.trim();

    if (!username) throw new Error('Username is required');
    if (!password) throw new Error('Password is required!');

    try {
      const user = await getUserByUsername(username);

      console.log(user);

      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      const isPasswordValid = await validatePassword(password, user.password);

      if (!isPasswordValid) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, user);
    } catch (error) {
      console.error(error);
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
  if (!userId) throw Error('userId is required.');

  try {
    const user = await getUserById(userId);

    if (!user) {
      return done(null, false, { message: 'Incorrect user id.' });
    }

    return done(null, user);
  } catch (error) {
    console.error(error);
    return done(error);
  }
});
