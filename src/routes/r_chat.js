const router = require('express').Router()
const { createRoom, getAllRoom } = require('../controller/c_chat')
const { authorization } = require('../middleware/Auth')

router.post('/createroom/', authorization, createRoom)
router.get('/getallroom/', authorization, getAllRoom)

module.exports = router
