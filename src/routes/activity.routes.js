const router = require('express').Router()
const {activityControllers} = require('../controllers')
const authMiddlewares = require('../middlewares/auth.middlewares')

// router.use(authMiddlewares)
router.get('/user/:id', activityControllers.getAllActivity)
router.get('/:id', activityControllers.getActivityById)
router.post('/', activityControllers.createActivity)
router.put('/:id', activityControllers.updateActivity)
router.delete('/:id', activityControllers.deleteActivity)

module.exports = router