const router = require('express').Router()
const { get, del } = require('../controller/c_notif')

router.get('/:id', get)
router.delete('/:id', del)
module.exports = router
