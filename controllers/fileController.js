import { getFolderById } from '../services/folderService.js';
import {
  addNewFile,
  getFileById,
  isFileNameTaken,
  removeFileById,
} from '../services/fileService.js';

const getFileUpload = async (req, res) => {
  const parentId = req.query.folder === '' ? null : req.query.folder;

  const parent = await getFolderById({ id: parentId });

  return res.status(400).render('upload-file', {
    errors: [],
    oldInput: [],
    parentId: parentId ?? null,
    parentFolderName: parent === null ? null : parent.name,
  });
};

const getFileDetails = async (req, res) => {
  const fileId = req.params.id || null;

  const file = await getFileById({ id: fileId });

  return res.render('file-details', {
    file,
  });
};

const postFileUpload = async (req, res, next) => {
  try {
    const { name } = req.body;
    const file = req.file;
    const folderId = req.query.folder === '' ? null : req.query.folder;
    const userId = req.user.id;

    const isTaken = await isFileNameTaken({ name, userId, folderId });

    if (isTaken) throw new Error('File name is already taken.');

    await addNewFile({ name, file, userId, folderId });

    return res.redirect(`/files?folder=${folderId || ''}`);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const postFileDelete = async (req, res, next) => {
  try {
    const userId = req.user.id || null;
    const fileId = req.query.file;

    await removeFileById({ id: fileId, userId });

    return res.redirect('/');
  } catch (error) {
    console.error(error);

    throw error;
  }
};

const getFileDownload = async (req, res, next) => {
  try {
    const fileId = req.params.id === '' ? null : req.params.id;

    const file = await getFileById({ id: fileId });

    const filePath = `uploads/${file.fileName}`;

    console.log('evo ga:', filePath);

    res.download(filePath, (err) => {
      if (err) {
        res.status(404).json({ msg: 'File not found.' });
      }
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export {
  getFileUpload,
  postFileUpload,
  getFileDetails,
  postFileDelete,
  getFileDownload,
};
