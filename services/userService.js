import { prisma } from '../lib/prisma.js';

export const getUserByUsername = async (username) => {
  if (!username) throw new Error('Username is required.');

  return await prisma.user.findFirst({
    where: { name: username },
  });
};

export const getUserById = async (userId) => {
  if (!userId) throw new Error('userId is required.');

  return await prisma.user.findFirst({
    where: { id: userId },
  });
};

export const addUser = async (username, hash) => {
  if (!username) throw new Error('username is required.');
  if (!hash) throw new Error('hash is required.');

  try {
    const user = await prisma.user.create({
      data: {
        name: username,
        password: hash,
      },
    });

    return user;
  } catch (error) {
    if (error.code === 'P2002') {
      throw new Error('Username already taken');
    }

    throw error;
  }
};
