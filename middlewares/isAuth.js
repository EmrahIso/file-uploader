export const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res
    .status(401)
    .json({ msg: 'You are not authorized to view this resource.' });
};
