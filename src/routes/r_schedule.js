const router = require('express').Router()
const { get, getById, post } = require('../controller/c_schedule')
const { authorization, isAdmin } = require('../middleware/Auth')

router.get('/', get)
router.get('/:id', getById)
router.post('/', authorization, isAdmin, post)
module.exports = router
