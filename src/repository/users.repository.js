const prisma = require("../models");

const createUser = async (email, password) => {
  const result = await prisma.user.create({
    data: {
      email: email,
      password: password,
    },
    select: {
      id: true,
      email: true
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
  })
  return result
};

const updateVerifyUser = async (id) => {
  const result = await prisma.user.update({
    where:{
      id: id,
    },
    data: {
      verified: true
    }
  })
  return result
}

const updateUser = async (id, email, password, verified) => {
  const result = await prisma.user.update({
    where:{
      id: id
    },
    data: {
      email: email,
      password: password,
      verified: verified
    }
  })
  return result
}


module.exports = { createUser, getAllUsers, getUserByEmail, updateVerifyUser, updateUser };
