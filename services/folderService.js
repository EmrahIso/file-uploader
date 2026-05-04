import { prisma } from '../lib/prisma.js';

const isFolderNameTaken = async ({ name, parentId, userId }) => {
  if (!parentId && parentId !== null) throw new Error('parentId is required.');
  if (!name) throw new Error('Name is required.');
  if (!userId) throw new Error('UserId is required.');

  const folder = await prisma.folder.findFirst({
    where: {
      name,
      parentId: parentId ?? null,
      userId,
    },
  });

  return !!folder;
};

const getFolderByIdAndUserId = async ({ userId, id }) => {
  if (!userId) throw new Error('UserId is required.');
  if (!id && id !== null) throw new Error('folderId is required.');

  if (id === null) {
    return {
      id: null,
      name: null,
      parentId: null,
    };
  }

  const folder = await prisma.folder.findFirst({
    where: {
      userId,
      id,
    },
  });

  return folder;
};

const getFolderById = async ({ id }) => {
  if (!id && id !== null) throw new Error('FolderId is required.');

  if (id === null) {
    return null;
  }

  const folder = await prisma.folder.findFirst({
    where: {
      id,
    },
  });

  return folder;
};

const getAllNestedFoldersByParentIdAndUserId = async ({ parentId, userId }) => {
  if (!parentId && parentId !== null) throw new Error('parentId is required.');
  if (!userId) throw new Error('UserId is required.');

  const folders = await prisma.folder.findMany({
    where: {
      parentId: parentId ?? null,
      userId,
    },
  });

  return folders;
};

const addNewFolder = async ({ name, parentId, userId }) => {
  if (!parentId && parentId !== null) throw new Error('parentId is required.');
  if (!name) throw new Error('Name is required.');
  if (!userId) throw new Error('UserId is required.');

  const user = await prisma.folder.create({
    data: {
      name,
      parentId: parentId ?? null,
      userId,
    },
  });

  return user;
};

const removeFolderById = async ({ id, userId }) => {
  if (!userId) throw new Error('UserId is required.');
  if (!id && id !== null) throw new Error('FolderId is required.');

  const folder = await prisma.folder.delete({
    where: {
      userId,
      id,
    },
  });

  return folder;
};

export {
  isFolderNameTaken,
  addNewFolder,
  getAllNestedFoldersByParentIdAndUserId,
  getFolderByIdAndUserId,
  getFolderById,
  removeFolderById,
};
