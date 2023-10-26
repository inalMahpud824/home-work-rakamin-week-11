const prisma = require("../models");

const createUser = async (email, password) => {
  const result = await prisma.user.create({
    data: {
      email: email,
      password: password,
    },
    select: {
      email: true,
    },
  });
  return result;
};

const getAllUsers = async () => {
  const result = await prisma.user.findMany({
    select: {
      email: true,
      password: true,
    },
  });
};

const getUserByEmail = async (email) => {
  const result = await prisma.user.findUnique({
    where:{
      email: email
    },
    select:{
      email: true,
      password: true
    }
  })
  return result
};

module.exports = { createUser, getAllUsers, getUserByEmail };
