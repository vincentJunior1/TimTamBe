const router = require('express').Router()
const { postBooking, postPassenger } = require('../controller/c_booking')
router.post('/mybooking', postBooking)
router.post('/passenger', postPassenger)
module.exports = router
