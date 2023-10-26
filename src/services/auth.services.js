const {userRepository} = require('../repository')
const ResponseError = require('../utils')
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken')
require('dotenv').config();


const register = async (params) => {
  const {email, password} = params
  const cekEmail = await userRepository.getUserByEmail(email)
  if(cekEmail){
    throw err = new ResponseError(409, "email already exist")
  }
  
  const saltRounds = 10; // Jumlah putaran salt (penambahan acak)
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const result = await userRepository.createUser(email, hashedPassword)
  if(!result){
    throw err = new ResponseError(500, 'Internal Server Error')
  }
  return result
}

const login = async (params) => {
  const {email, password} = params
  
  const user = await userRepository.getUserByEmail(email)
  
  if(!user){
    throw err = new ResponseError(401, "email or password wrong")
  }
  const cekPassword = await bcrypt.compare(password, user.password)
  if(!cekPassword){
    throw err = new ResponseError(401, "email or password wrong")
  }
  const payload = {
    id: user.id,
    email: user.email
  }
  const key = process.env.JWT_SECRET
  const aksesToken = jwt.sign(payload, key,{expiresIn: '2h'});
  return aksesToken
}
module.exports = {register, login}