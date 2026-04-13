import {
  getFolderByIdAndUserId,
  addNewFolder,
  removeFolderById,
} from '../services/folderService.js';

export const getFolderUpload = async (req, res) => {
  const parentId = req.query.folder;
  const userId = req.user.id;

  const parentFolder = await getFolderByIdAndUserId({ userId, id: parentId });

  res.render('upload-folder', {
    parentId: parentId || null,
    oldInput: [],
    parentFolderName: parentFolder?.name || null,
    errors: [],
  });
};

export const postFolderUpload = async (req, res) => {
  try {
    const { name } = req.body;
    const parentId = req.query.folder === '' ? null : req.query.folder;
    const userId = req.user.id;

    await addNewFolder({ name, parentId, userId });

    return res.redirect(`/files?folder=${parentId || ''}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const postFolderDelete = async (req, res) => {
  try {
    const userId = req.user.id || null;
    const folderId = req.query.folder;

    await removeFolderById({ id: folderId, userId });

    return res.redirect('/');
  } catch (error) {
    console.error(error);
    throw error;
  }
};
