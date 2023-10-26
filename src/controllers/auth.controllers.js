const { authServices } = require("../services");

const register = async (req, res) => {
  try {
    const result = await authServices.register(req.body);
    res.status(200).json({messege: "create user success ",result})
  } catch(err) {
    console.error(err)
    res.status(err.status).json(err.message)
  }
};

module.exports = {register}
