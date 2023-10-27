const prisma = require('../src/models')
const bcrypt = require('bcrypt')
const createUser = async () => {
  await prisma.user.create({
    data:{
      email: 'test',
      password: await bcrypt.hash('rahasia', 10),
    }
  })
}

const removeUser = async() => {
  await prisma.user.deleteMany({
    where:{
      email: 'test'
    }
  })
}

module.exports = {createUser, removeUser}