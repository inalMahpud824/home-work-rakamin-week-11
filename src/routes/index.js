const router = require('express').Router()
const authRoutes = require('./auth.routes')
const activityRoutes = require('./activity.routes')
router.use('/auth', authRoutes)
router.use('/activity', activityRoutes)

module.exports = router