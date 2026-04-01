export const postLogOut = (req, res, next) => {
  req.logout((error) => {
    if (error) return next(error);

    req.session.destroy((error) => {
      if (error) return next(error);

      res.clearCookie('connect.sid', { path: '/' });
      return res.redirect('/');
    });
  });
};
