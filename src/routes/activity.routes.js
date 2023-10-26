const router = require('express').Router()
const {activityControllers} = require('../controllers')
router.get('/', activityControllers.getAllActivity)
router.post('/', activityControllers.createActivity)

module.exports = router