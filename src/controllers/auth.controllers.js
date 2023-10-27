const { authServices } = require("../services");

const register = async (req, res) => {
  try {
    const result = await authServices.register(req.body);
    res.status(200).json({messege: "create user success ",result})
  } catch(err) {
    res.status(err.status).json(err.message)
  }
};

const login = async (req, res) => {
  try {
    const result = await authServices.login(req.body);
    res.status(200).header('Authorization', `Bearer ${result}`).json({
      message: "login succes",
  })
  } catch(err) {
    res.status(err.status).json(err.message)
  }
};

module.exports = {register, login}
