const prisma = require("../src/models");
const bcrypt = require('bcryptjs');
const createUser = async () => {
  await prisma.user.create({
    data: {
      email: "test",
      password: await bcrypt.hash("rahasia", 10),
    },
  });
};

const removeUser = async () => {
  await prisma.user.deleteMany({
    where: {
      email: "test",
    },
  });
};

const removeActivity = async () => {
  await prisma.activity.deleteMany();
};

const createActivity = async () => {
  return await prisma.activity.create({
    data: {
      title: "test activity",
    },select:{
      id: true
    }
  });
};

const createManyActivity = async () => {
  for (let i = 0; i < 15; i++) {
    await prisma.activity.create({
      data: {
        title: "test activity",
      },
    });
  }
};

const getActivity = async () => {
  return await prisma.activity.findFirst({
    where: {
      title: "test activity",
    },
  });
};

const createItem = async (activity_id) => {
  await prisma.item.create({
    data: {
      activity_id: activity_id,
      title: "test",
      isActive: true,
    },
  });
};

const removeItem = async () => {
  await prisma.item.deleteMany();
};

const getItem = async () => {
  return await prisma.item.findFirst({
    where: {
      title: "test",
    },
  });
};

const createManyItem = async () => {
  for (let i = 0; i < 15; i++) {
    await prisma.item.create({
      data: {
        title: "test",
      },
    });
  }
};

module.exports = {
  createUser,
  removeUser,
  createActivity,
  removeActivity,
  createManyActivity,
  getActivity,
  removeItem,
  getItem, 
  createItem,
  createManyItem
};
