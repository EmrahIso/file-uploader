import { getAllNestedFoldersByParentIdAndUserId } from '../services/folderService.js';
import { getAllFilesByFolderIdAndUserId } from '../services/fileService.js';

const getIndex = async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.render('index', {
        browseFolders: [],
        browseFiles: [],
        currentFolderId: null,
        parentFolderId: null,
        currentFolderName: 'root',
      });
    }

    const parentId = null; // index page is root folder so parentId === null
    const userId = req.user.id;

    const browseFolders = await getAllNestedFoldersByParentIdAndUserId({
      parentId,
      userId,
    });

    const browseFiles = await getAllFilesByFolderIdAndUserId({
      folderId: parentId,
      userId,
    });

    return res.render('index', {
      browseFolders,
      browseFiles: browseFiles,
      currentFolderId: null,
      parentFolderId: null,
      currentFolderName: 'root',
    });
  } catch (error) {
    console.error(error);

    next(error);
  }
};

export { getIndex };
