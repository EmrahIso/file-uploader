import {
  getFolderByIdAndUserId,
  addNewFolder,
  removeFolderById,
  isFolderNameTaken,
} from '../services/folderService.js';

export const getFolderUpload = async (req, res) => {
  const parentId = req.query.folder === '' ? null : req.query.folder;
  const userId = req.user.id;

  const parentFolder = await getFolderByIdAndUserId({ userId, id: parentId });

  res.render('upload-folder', {
    parentId: parentId || null,
    oldInput: [],
    parentFolderName: parentFolder?.name || null,
    errors: [],
  });
};

export const postFolderUpload = async (req, res, next) => {
  try {
    const { name } = req.body;
    const parentId = req.query.folder === '' ? null : req.query.folder;
    const userId = req.user.id;

    const isTaken = await isFolderNameTaken({ name, parentId, userId });

    if (isTaken) throw new Error('Folder name is already taken.');

    await addNewFolder({ name, parentId, userId });

    return res.redirect(`/files?folder=${parentId || ''}`);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const postFolderDelete = async (req, res, next) => {
  try {
    const userId = req.user.id || null;
    const folderId = req.query.folder;

    await removeFolderById({ id: folderId, userId });

    return res.redirect('/');
  } catch (error) {
    console.error(error);
    next(error);
  }
};
