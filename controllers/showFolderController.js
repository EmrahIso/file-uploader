import {
  getFolderByIdAndUserId,
  getAllNestedFoldersByParentIdAndUserId,
} from '../services/folderService.js';
import { getAllFilesByFolderIdAndUserId } from '../services/fileService.js';

export const getShowFolder = async (req, res) => {
  try {
    const userId = req.user.id;
    const folderId = req.query.folder || null;

    const currentFolder = await getFolderByIdAndUserId({
      id: folderId,
      userId,
    });

    const browseFolders = await getAllNestedFoldersByParentIdAndUserId({
      parentId: folderId,
      userId,
    });

    const browseFiles = await getAllFilesByFolderIdAndUserId({
      folderId,
      userId,
    });

    return res.render('index', {
      browseFolders,
      browseFiles,
      currentFolderId: folderId,
      parentFolderId: currentFolder?.parentId || null,
      currentFolderName: currentFolder?.name || null,
    });
  } catch (error) {
    console.error(error);

    next(error);
  }
};
