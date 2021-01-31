const router = require('express').Router()
const { get, getById } = require('../controller/c_schedule')

router.get('/', get)
router.get('/:id', getById)
module.exports = router
