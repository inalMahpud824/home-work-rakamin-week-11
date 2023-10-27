const { activityServices } = require("../services");

const getAllActivity = async (req, res) => {
  try {
    const result = await activityServices.getAllActivity();
    res.status(200).json({ message: "success", result });
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

const createActivity = async (req, res) => {
  try{
    const result = await activityServices.createActivity(req.body)
    res.status(200).json({ message: "create success", result });
  }catch (err) {
    res.status(err.status).json(err.message);
  }
}

const getActivityById = async (req, res) => {
  try{
    const result = await activityServices.getActivityById(req.params)
    res.status(200).json({ message: "success", result });
  }catch (err) {
    res.status(err.status).json(err.message);
  }
}

const updateActivity = async (req, res) => {
  try{
    const result = await activityServices.updateActivity(req.params, req.body)
    res.status(200).json({ message: "update success", result });
  }catch (err) {
    res.status(err.status).json(err.message);
  }
}

const deleteActivity = async (req, res) => {
  try{
    const result = await activityServices.deleteActivity(req.params)
    res.status(200).json({ message: "delete success", result });
  }catch (err) {
    res.status(err.status).json(err.message);
  }
}

module.exports = {getAllActivity, createActivity, getActivityById, updateActivity, deleteActivity}
