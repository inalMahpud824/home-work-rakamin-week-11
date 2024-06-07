const { authServices } = require("../services");

const register = async (req, res) => {
  try {
    const result = await authServices.register(req.body);
    res.status(200).json({messege: "create user success ",data: result})
  } catch(err) {
    res.status(err.status).json({message: err.message})
  }
};

const login = async (req, res) => {
  try {
    const result = await authServices.login(req.body);
    res.status(200).json({
      token: result,
      message: "login succes"
  })
  } catch(err) {
    res.status(err.status).json({message: err.message})
  }
};

const verifyOTP = async (req, res) => {
  try {
    const result = await authServices.verifyOTP(req.body);
    res.status(200).json({messege: "your email is verified ",result})
  } catch(err) {
    res.status(err.status).json({message: err.message})
  }
};

module.exports = {register, login, verifyOTP}
