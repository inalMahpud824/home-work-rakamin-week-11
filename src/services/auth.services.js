const {userRepository} = require('../repository')
const ResponseError = require('../utils')
const bcrypt = require('bcrypt'); 


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
module.exports = {register}