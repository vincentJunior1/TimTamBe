const router = require('express').Router()
const user = require('./routes/r_user')
const schedule = require('./routes/r_schedule')
const chat = require('./routes/r_chat')

router.use('/user', user)
router.use('/schedule', schedule)
router.use('/chat', chat)

module.exports = router
