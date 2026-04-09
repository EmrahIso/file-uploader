import {
  getFolderByIdAndUserId,
  getAllNestedFoldersByParentIdAndUserId,
} from '../services/folderService.js';

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

    return res.render('index', {
      browseFolders,
      browseFiles: [],
      currentFolderId: folderId,
      parentFolderId: currentFolder?.parentId || null,
      currentFolderName: currentFolder?.name || null,
    });
  } catch (error) {
    console.error(error);

    throw error;
  }
};

/*

TODO: Napravi provjeru sa getFolderById (nova funkcija) da sprijecis da jedan korisnik pristupi folderu drugog korisnika:
folderService.js i checkFolderOwnership.js

*/
