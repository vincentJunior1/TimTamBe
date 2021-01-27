const router = require('express').Router()

const { registerUser } = require('../controller/c_user')

router.post('/register/', registerUser)

module.exports = router
