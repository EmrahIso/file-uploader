import { prisma } from '../lib/prisma.js';

const isFileNameTaken = async ({ name, userId, folderId }) => {
  if (!folderId && folderId !== null) throw new Error('folderId is required.');
  if (!name) throw new Error('Name is required.');
  if (!userId) throw new Error('UserId is required.');

  const file = await prisma.file.findFirst({
    where: {
      name,
      folderId: folderId ?? null,
      userId,
    },
  });

  return !!file;
};

const getAllFilesByFolderIdAndUserId = async ({ folderId, userId }) => {
  if (!folderId && folderId !== null) throw new Error('folderId is required.');
  if (!userId) throw new Error('UserId is required.');

  const files = await prisma.file.findMany({
    where: {
      folderId: folderId ?? null,
      userId,
    },
  });

  return files;
};

const getFileByIdAndUserId = async ({ userId, id }) => {
  if (!id) throw new Error('Id is required.');
  if (!userId) throw new Error('UserId is required.');

  const file = await prisma.file.findFirst({
    where: {
      id,
      userId,
    },
  });

  return file;
};

const getFileById = async ({ id }) => {
  if (!id) throw new Error('Id is required.');

  const file = await prisma.file.findFirst({
    where: {
      id,
    },
  });

  return file;
};

const getFileSizeByIdAndUserId = async ({ id, userId }) => {
  if (!id) throw new Error('Id is required.');
  if (!userId) throw new Error('UserId is required.');

  const file = await prisma.file.findFirst({
    where: {
      id,
      userId,
    },
  });

  return file.size;
};

const getFileMimeTypeByIdAndUserId = async ({ id, userId }) => {
  if (!id) throw new Error('Id is required.');
  if (!userId) throw new Error('UserId is required.');

  const file = await prisma.file.findFirst({
    where: {
      id,
      userId,
    },
  });

  return file.size;
};

const addNewFile = async ({ name, file, userId, folderId }) => {
  console.log('fileService - file:', file);
  if (!file) throw new Error('File is required.');
  if (!userId) throw new Error('UserId is required.');
  if (!folderId && folderId !== null) throw new Error('folderId is required.');

  const newFile = await prisma.file.create({
    data: {
      name,
      size: file.size,
      path: file.path,
      mimeType: file.mimeType,
      fileName: file.filename,
      folderId,
      userId,
    },
  });

  return newFile;
};

const removeFileById = async ({ id, userId }) => {
  if (!userId) throw new Error('UserId is required.');
  if (!id && id !== null) throw new Error('FileId is required.');

  const folder = await prisma.file.delete({
    where: {
      userId,
      id,
    },
  });

  return folder;
};

export {
  isFileNameTaken,
  getAllFilesByFolderIdAndUserId,
  getFileByIdAndUserId,
  getFileById,
  getFileSizeByIdAndUserId,
  getFileMimeTypeByIdAndUserId,
  addNewFile,
  removeFileById,
};
