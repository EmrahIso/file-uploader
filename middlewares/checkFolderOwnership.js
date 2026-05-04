import { getFileById } from '../services/fileService.js';
import { getFolderById } from '../services/folderService.js';

const checkShowFolderOwnership = async (req, res, next) => {
  try {
    const folderId = req.query.folder === '' ? null : req.query.folder;

    if (folderId === undefined) {
      throw new Error('folderId is required');
    }

    if (folderId === null) return res.redirect('/');

    const folder = await getFolderById({ id: folderId });

    const userId = req.user.id;

    if (folder.userId !== userId) {
      throw new Error('You do not have permission to access this folder');
    }

    return next();
  } catch (error) {
    console.error(error);

    next(error);
  }
};

const checkFolderOwnership = async (req, res, next) => {
  try {
    const folderId = req.query.folder === '' ? null : req.query.folder;

    if (folderId === undefined) {
      throw new Error('folderId is required.');
    }

    const folder = await getFolderById({ id: folderId });

    const userId = req.user.id;

    if (folder === null) {
      return next();
    }

    if (folder.userId !== userId) {
      throw new Error('You do not have permission to access this folder');
    }

    return next();
  } catch (error) {
    console.error(error);

    next(error);
  }
};

const checkFolderOwnershipByFile = async (req, res, next) => {
  try {
    const fileId = req.params.id ?? null;

    if (!fileId) {
      throw new Error('fileId is required.');
    }

    const file = await getFileById({ id: fileId });
    const folderId = file.folderId ?? null;

    if (folderId === undefined) {
      throw new Error('folderId is required.');
    }

    const folder = await getFolderById({ id: folderId });

    const userId = req.user.id;

    if (folder === null) {
      return next();
    }

    if (folder.userId !== userId) {
      throw new Error('You do not have permission to access this folder');
    }

    return next();
  } catch (error) {
    console.error(error);

    next(error);
  }
};

export {
  checkShowFolderOwnership,
  checkFolderOwnership,
  checkFolderOwnershipByFile,
};
