const router = require('express').Router()
const user = require('./routes/r_user')
const schedule = require('./routes/r_schedule')

router.use('/user', user)
router.use('/schedule', schedule)

module.exports = router
