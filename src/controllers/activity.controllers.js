const { activityServices } = require("../services");

const getAllActivity = async (req, res) => {
  try {
    const result = await activityServices.getAllActivity();
    res.status(200).json({ messege: "success", result });
  } catch (err) {
    console.error(err);
    res.status(err.status).json(err.message);
  }
};

const createActivity = async (req, res) => {
  try{
    const result = await activityServices.createActivity(req.body)
    res.status(200).json({ messege: "create success", result });
  }catch (err) {
    console.error(err);
    res.status(err.status).json(err.message);
  }
}

module.exports = {getAllActivity, createActivity}
