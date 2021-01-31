const router = require('express').Router()
const { get, getById, post } = require('../controller/c_schedule')

router.get('/', get)
router.get('/:id', getById)
router.post('/', post)
module.exports = router
