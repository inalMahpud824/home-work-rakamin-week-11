const ResponseError = require("../utils");
const { itemRepository } = require("../repository");

const getAllItems = async (params) => {
  const {id} = params
  const userId = parseInt(id)
  const result = await itemRepository.getAllItems(userId)
  if (!result) {
    throw (err = new ResponseError(500, "Internal Server Error"));
  }
  return result;
}

const getItemById = async (params) => {
  const {id} = params
  const cekIdIsNotString = parseInt(id)
  if(!cekIdIsNotString){
    throw (err = new ResponseError(404, "Item not found"));
  }
  const result = await itemRepository.getItemById(id)
  if (!result) {
    throw (err = new ResponseError(404, "Item not found"));
  }
  return result;
}

const createItem = async (body) => {
  const {activity_id, title, isActive} = body
  const activityId = parseInt(activity_id)
  const result = await itemRepository.createItem(activityId, title, isActive)
  if (!result) {
    throw (err = new ResponseError(500, "Internal Server Error"));
  }
  return result;
}

const updateItem = async (params, body) => {
  const {id} = params
  const {activity_id, title, isActive} = body
  const cekIdIsNotString = parseInt(id)
  if(!cekIdIsNotString){
    throw (err = new ResponseError(404, "Item not found"));
  }
  const cekId = await itemRepository.getItemById(id);
  if (!cekId) {
    throw (err = new ResponseError(404, "Item not found"));
  }

  const result = await itemRepository.updateItem(id, activity_id, title, isActive)
  if (!result) {
    throw (err = new ResponseError(500, "Internal Server Error"));
  }
  return result;
}

const deleteItem = async (params) => {
  const {id} = params
  const cekIdIsNotString = parseInt(id)
  if(!cekIdIsNotString){
    throw (err = new ResponseError(404, "Item not found"));
  }
 const cekId = await itemRepository.getItemById(id);
  if (!cekId) {
    throw (err = new ResponseError(404, "Item not found"));
  }

  const result = await itemRepository.deleteItem(id)
  if (!result) {
    throw (err = new ResponseError(500, "Internal Server Error"));
  }
  return result;
}

module.exports = {getAllItems, getItemById, createItem, updateItem, deleteItem}