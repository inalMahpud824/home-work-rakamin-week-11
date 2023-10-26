const prisma = require('../models')

const getAllActivity = async () => {
  const result = await prisma.activity.findMany()
  return result
}

const createActivity = async (title) => {
  const result = await prisma.activity.create({
    data:{
      title:title
    },
    select:{
      title: true
    }
  })
  return result
}

module.exports = {getAllActivity, createActivity}