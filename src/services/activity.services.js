const ResponseError = require("../utils");
const { activityRepository } = require("../repository");

const getAllActivity = async () => {
  const result = await activityRepository.getAllActivity();
  if (!result) {
    throw (err = new ResponseError(500, "Internal Server Error"));
  }
  return result;
};

const createActivity = async (body) => {
  const { title } = body;

  const result = await activityRepository.createActivity(title);
  if (!result) {
    throw (err = new ResponseError(500, "Internal Server Error"));
  }
  return result;
};

const getActivityById = async (params) => {
  const { id } = params;
  const result = await activityRepository.getActivityById(id);
  if (!result) {
    throw (err = new ResponseError(404, "Activity not found"));
  }
  return result;
};

const updateActivity = async (params, body) => {
  const { id } = params;
  const cekId = await activityRepository.getActivityById(id);
  if (!cekId) {
    throw (err = new ResponseError(404, "Activity not found"));
  }
  const { title } = body;
  const result = await activityRepository.updateActivity(id, title);
  if (!result) {
    throw (err = new ResponseError(500, "Internal Server Error"));
  }
  return result;
};

const deleteActivity = async (params) => {
  const { id } = params;
  const cekId = await activityRepository.getActivityById(id);

  if (!cekId) {
    throw (err = new ResponseError(404, "Activity not found"));
  }

  const result = await activityRepository.deleteActivity(id);
  if (!result) {
    throw (err = new ResponseError(404, "Activity not found"));
  }
  return result;
};
module.exports = {
  getAllActivity,
  createActivity,
  getActivityById,
  updateActivity,
  deleteActivity,
};
