const { userRepository, tokenOtpRepository } = require("../repository");
const ResponseError = require("../utils");
const bcrypt = require("bcryptjs");
const { text } = require("express");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();

const register = async (params) => {
  const transport = nodemailer.createTransport({
    host: process.env.MAIL_SERVICE,
    port: 465, // or 465 for SSL
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_USER, // your Gmail address
      pass: process.env.MAIL_PASS, // your Gmail password or app-specific password
    },
  });
  const { email, password } = params;
  const cekEmail = await userRepository.getUserByEmail(email);
  if (cekEmail) {
    if (cekEmail.verified === 0 || cekEmail.verified === false) {
      const saltRounds = 10; // Jumlah putaran salt (penambahan acak)
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const result = await userRepository.updateUser(
        cekEmail.id,
        cekEmail.email,
        cekEmail.password,
        cekEmail.verified
      );
      if (!result) {
        throw (err = new ResponseError(500, "Internal Server Error"));
      }

      const tokenOTP = `${Math.floor(
        10000 + Math.random() * 90000
      ).toString()}`;
      const expireTime = Date.now() + 3600000; //expire dalam 1 jam

      // const emailContent = `Enter ${tokenOTP} in the app to veryy your email this OTP expire in 1 hour`;

      // // Kirim email aktivasi
      // const mailOption = {
      //   from: "inalmahpud32@gmail.com",
      //   to: email,
      //   subject: "verify your email",
      //   text: emailContent,
      // };

      // transport.sendMail(mailOption, function (err, data) {
      //   if (err) {
      //     console.log(err);
      //     throw (err = new ResponseError(500, "Internal Server Error"));
      //   } else {
      //     console.log("Email sent successfully");
      //   }
      // });

      // const cekKodeOtp = await tokenOtpRepository.getTokenOtp(result.id)
      // if(cekKodeOtp){
      //   if(cekKodeOtp.expiredAt < new Date()){
      //     await tokenOtpRepository.deleteTokenOtp(cekKodeOtp.id)
      //   }
      // }
      const getToken = await tokenOtpRepository.getTokenOtp(cekEmail.id)
      if(getToken){
        await tokenOtpRepository.deleteTokenOtp(getToken.id)
      }
      const createOtp = await tokenOtpRepository.createTokenOtp(
        result.id,
        tokenOTP,
        expireTime
      );
      if (!createOtp) {
        console.log(createOtp);
        throw (err = new ResponseError(500, "Internal Server Error"));
      }
      return result;
    }
    else{
      throw (err = new ResponseError(409, "email already exist"));
    }
  }

  const saltRounds = 10; // Jumlah putaran salt (penambahan acak)
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const result = await userRepository.createUser(email, hashedPassword);
  if (!result) {
    throw (err = new ResponseError(500, "Internal Server Error"));
  }

  const tokenOTP = `${Math.floor(10000 + Math.random() * 90000).toString()}`;
  const expireTime = Date.now() + 3600000; //expire dalam 1 jam

  // const emailContent = `Enter ${tokenOTP} in the app to veryy your email this OTP expire in 1 hour`;

  // // Kirim email aktivasi
  // const mailOption = {
  //   from: "inalmahpud32@gmail.com",
  //   to: email,
  //   subject: "verify your email",
  //   text: emailContent,
  // };

  // transport.sendMail(mailOption, function (err, data) {
  //   if (err) {
  //     console.log(err);
  //     throw (err = new ResponseError(500, "Internal Server Error"));
  //   } else {
  //     console.log("Email sent successfully");
  //   }
  // });

  // const cekKodeOtp = await tokenOtpRepository.getTokenOtp(result.id)
  // if(cekKodeOtp){
  //   if(cekKodeOtp.expiredAt < new Date()){
  //     await tokenOtpRepository.deleteTokenOtp(cekKodeOtp.id)
  //   }
  // }

  const createOtp = await tokenOtpRepository.createTokenOtp(
    result.id,
    tokenOTP,
    expireTime
  );
  if (!createOtp) {
    console.log(createOtp);
    throw (err = new ResponseError(500, "Internal Server Error"));
  }

  return result;
};

const login = async (params) => {
  const { email, password } = params;

  const user = await userRepository.getUserByEmail(email);

  if (!user) {
    throw (err = new ResponseError(401, "email or password wrong"));
  }
  const cekPassword = await bcrypt.compare(password, user.password);
  if (!cekPassword) {
    throw (err = new ResponseError(401, "email or password wrong"));
  }
  if (user.verified === 0 || user.verified === false) {
    throw (err = new ResponseError(401, "Your account is not verified please register again"));
  }
  const payload = {
    id: user.id,
    email: user.email,
  };
  const key = process.env.JWT_SECRET;
  const aksesToken = jwt.sign(payload, key, { expiresIn: "2h" });
  return aksesToken;
};

const verifyOTP = async (params) => {
  const { uid, codeOtp } = params;

  if (!codeOtp || !uid) {
    throw new ResponseError(400, "OTP or UID is empty");
  }

  const cekTokenOtp = await tokenOtpRepository.getTokenOtp(uid);
  if (!cekTokenOtp) {
    throw new ResponseError(404, "OTP not found");
  }

  if (cekTokenOtp.expiredAt < new Date()) {
    await tokenOtpRepository.deleteTokenOtp(cekTokenOtp.id);
    throw new ResponseError(400, "OTP is expired");
  }
  if (cekTokenOtp.otp !== codeOtp) {
    throw new ResponseError(400, "OTP is incorrect");
  }

  const updateUser = await userRepository.updateVerifyUser(uid);
  if (!updateUser) {
    throw (err = new ResponseError(500, "Internal Server Error"));
  }
  await tokenOtpRepository.deleteTokenOtp(cekTokenOtp.id);

  return true;
};
module.exports = { register, login, verifyOTP };
