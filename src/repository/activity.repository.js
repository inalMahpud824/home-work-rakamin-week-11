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

const getActivityById = async (params) => {
  const id = parseInt(params)
  const result = await prisma.activity.findUnique({
    where:{
      id: id
    }
  })
  return result
}

const updateActivity = async (params, title) => {
  const id = parseInt(params)
  const result = await prisma.activity.update({
    where:{
      id: id
    },
    data:{
      title: title
    },
    select:{
      title:true
    }
  })
  return result
}

const deleteActivity = async (params) => {
  const id = parseInt(params)
  const result = await prisma.activity.delete({
    where:{
      id: id
    }
  })
  return result
}
module.exports = {getAllActivity, createActivity, getActivityById, updateActivity, deleteActivity}