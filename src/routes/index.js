const router = require('express').Router()
const authRoutes = require('./auth.routes')
const activityRoutes = require('./activity.routes')
const itemRoutes = require('./item.routes')
router.use('/auth', authRoutes)
router.use('/activity', activityRoutes)
router.use('/items', itemRoutes)

module.exports = router