const router = require('express').Router()
const user = require('./routes/r_user')
const schedule = require('./routes/r_schedule')
const chat = require('./routes/r_chat')
const booking = require('./routes/r_booking')

router.use('/user', user)
router.use('/schedule', schedule)
router.use('/chat', chat)
router.use('/booking', booking)
module.exports = router
