import { addUser } from '../services/userService.js';
import { generatePassword } from '../utils/passwordUtils.js';

const getSignUp = (req, res) => {
  res.render('signup', { errors: [], oldInput: {} });
};

const postSignUp = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const hash = await generatePassword(password);

    await addUser(username, hash);
  } catch (error) {
    if (error.message === 'Username already taken.') {
      return res.status(409).json({ msg: 'Username already taken.' });
    }

    return next(error);
  }

  return res.status(201).redirect('/login');
};

export { getSignUp, postSignUp };
