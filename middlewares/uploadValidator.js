export const validateUpload = (req, res, next) => {
  console.log('req.file:', req.file);

  if (!req.file) {
    return res.status(400).render('upload-file', {
      errors: ['File is required'],
    });
  }

  next();
};
