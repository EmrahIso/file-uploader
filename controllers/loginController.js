import passport from 'passport';

const getLogIn = (req, res) => {
  if (res.locals.loggedIn && req.isAuthenticated()) {
    return res.redirect('/');
  }

  res.render('login', {
    errors: [],
    oldInput: [],
  });
};

const postLogIn = (req, res, next) => {
  passport.authenticate('local', (error, user, info) => {
    if (error) {
      return next(error);
    }

    if (!user) {
      return res.status(401).render('login', {
        errors: [
          { msg: info && info.message ? info.message : 'Login failed.' },
        ],
        oldInput: req.body,
      });
    }

    req.logIn(user, (error) => {
      if (error) {
        console.error(error);
        return next(error);
      }

      return res.redirect('/');
    });
  })(req, res, next);
};

export { getLogIn, postLogIn };
