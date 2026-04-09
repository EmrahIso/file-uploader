import { getFolderById } from '../services/folderService.js';

export const checkFolderOwnership = async (req, res, next) => {
  try {
    const folderId = req.query.folder === '' ? null : req.query.folder;

    console.log('folderId:', folderId);

    if (folderId === undefined) return next();
    if (folderId === null) return res.redirect('/');

    const folder = await getFolderById({ id: folderId });

    const userId = req.user.id;

    if (folder.userId !== userId) {
      throw new Error('This folder is not yours!');
    }

    return next();
  } catch (error) {
    console.error(error);

    throw error;
  }
};
