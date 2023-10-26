const jwt = require("jsonwebtoken");
require("dotenv").config();

const key = process.env.JWT_SECRET

async function authorization(req, res, next) {
  try {
    const aksesToken = req.header("Authorization");

    if (!aksesToken || !aksesToken.startsWith('Bearer ')) {
      return res.status(400).json({
        message: "Silahkan login terlebih dahulu",
      });
    }
    const token = aksesToken.slice(7)
    const aksesTokenPayload = jwt.verify(token, key,);
    next()
  } catch (err) {
    return res.status(401).json({
      message: "Token akses tidak valid atau kedaluwarsa.",
    });
  }
}

module.exports = authorization;
