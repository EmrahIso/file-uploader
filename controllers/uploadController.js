const getUpload = (req, res) => {
  res.render('upload', {
    errors: [],
  });
};

export { getUpload };
