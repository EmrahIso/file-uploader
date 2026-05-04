import { getFileById } from '../services/fileService.js';

const checkFileOwnership = async (req, res, next) => {
  try {
    const fileId = req.query.file === '' ? null : req.query.file;

    if (fileId === undefined) {
      throw new Error('fileId is required');
    }

    if (fileId === null) return res.redirect('/');

    const file = await getFileById({ id: fileId });

    const userId = req.user.id;

    if (file.userId !== userId) {
      throw new Error('You do not have permission to access this folder');
    }

    return next();
  } catch (error) {
    console.error(error);

    next(error);
  }
};

export { checkFileOwnership };
