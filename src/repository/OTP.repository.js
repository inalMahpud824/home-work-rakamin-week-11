const prisma = require("../models");

const createTokenOtp = async (userId, kodeOtp, expireAt) => {
  const result = await prisma.tokenOTP.create({
    data: {
      userId: userId,
      otp: kodeOtp,
      createAt: new Date(),
      expiredAt: new Date(expireAt),
    },
  });
  return result;
};

const getTokenOtp = async (userId) => {
  const result = await prisma.tokenOTP.findFirst({
    where: {
      userId: userId
    },
  });
  return result;
};

const deleteTokenOtp = async (id) => {
  const result = await prisma.tokenOTP.delete({
    where: {
      id: id
    }
  });
  return
};



module.exports = { createTokenOtp, getTokenOtp, deleteTokenOtp };
