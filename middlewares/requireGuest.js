export const requireGuest = (req, res, next) => {
  if (res.locals.loggedIn && req.isAuthenticated()) {
    return res.redirect('/');
  }

  next();
};
