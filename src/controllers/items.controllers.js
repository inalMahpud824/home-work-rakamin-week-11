const { itemServices } = require("../services");

const getAllItems = async (req, res) => {
  try {
    const result = await itemServices.getAllItems();
    res.status(200).json({ messege: "success", result });
  } catch (err) {
    console.error(err);
    res.status(err.status).json(err.message);
  }
};

const createItem = async (req, res) => {
  try{
    const result = await itemServices.createItem(req.body)
    res.status(200).json({ messege: "create success", result });
  }catch (err) {
    console.error(err);
    res.status(err.status).json(err.message);
  }
}

const getItemById = async (req, res) => {
  try{
    const result = await itemServices.getItemById(req.params)
    res.status(200).json({ messege: "success", result });
  }catch (err) {
    console.error(err);
    res.status(err.status).json(err.message);
  }
}

const updateItem = async (req, res) => {
  try{
    const result = await itemServices.updateItem(req.params, req.body)
    res.status(200).json({ messege: "update success", result });
  }catch (err) {
    console.error(err);
    res.status(err.status).json(err.message);
  }
}

const deleteItem = async (req, res) => {
  try{
    const result = await itemServices.deleteItem(req.params)
    res.status(200).json({ messege: "delete success", result });
  }catch (err) {
    console.error(err);
    res.status(err.status).json(err.message);
  }
}

module.exports = {getAllItems, getItemById, createItem, updateItem, deleteItem}
