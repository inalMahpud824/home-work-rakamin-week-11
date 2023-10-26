const prisma = require('../models')

const createItem = async (activity_id, title, isActive) => {
  const result = await prisma.item.create({
    data:{
      activity_id: activity_id,
      title: title,
      isActive: isActive,
    }
  })
  return result
}
const getItemById = async (params) => {
  const id = parseInt(params)
  const result = await prisma.item.findUnique({
    where:{
      id: id
    }
  })
  return result
}

const getAllItems = async () => {
  const result = await prisma.item.findMany()
  return result
}

const updateItem = async (params, activity_id, title, isActive) => {
  const id = parseInt(params)
  const result = await prisma.item.update({
    where:{
      id: id
    },
    data:{
      activity_id: activity_id,
      title: title,
      isActive: isActive
    }
  })
  return result
}

const deleteItem = async (params) => {
  const id = parseInt(params)
  const result = await prisma.item.delete({
    where:{
      id: id
    }
  })
  return result
}

module.exports = {createItem, getAllItems, getItemById, updateItem, deleteItem}