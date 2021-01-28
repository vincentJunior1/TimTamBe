const router = require('express').Router()
const { get } = require('../controller/c_schedule')

router.get('/', get)
module.exports = router
