const router = require('express').Router()
const {
  createRoom,
  getAllRoom,
  getRoomByRoomNumber,
  sendMessage
} = require('../controller/c_chat')
const { authorization } = require('../middleware/Auth')

router.post('/createroom/', authorization, createRoom)
router.get('/getallroom/', authorization, getAllRoom)
router.get('/getroom/:id', authorization, getRoomByRoomNumber)
router.post('/sendmessage/:id', authorization, sendMessage)

module.exports = router
