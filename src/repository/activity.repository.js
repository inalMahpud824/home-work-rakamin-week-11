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
    },
    include:{
      items: true
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
  const cekIdItems = await prisma.item.findUnique
  if(cekIdItems){
    await prisma.item.deleteMany({
      where:{
        activity_id: id
      }
    })
  }
  const result = await prisma.activity.delete({
    where:{
      id: id
    },
    include: { items: true },
  })
  return result
}
module.exports = {getAllActivity, createActivity, getActivityById, updateActivity, deleteActivity}