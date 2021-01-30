const router = require('express').Router()
const {
  getBooking,
  getPassenger,
  postBooking,
  patchBooking,
  postPassenger,
  deleteBooking
} = require('../controller/c_booking')

router.get('/mybooking/:id', getBooking)
router.get('/passenger/:bookingId', getPassenger)
router.post('/mybooking', postBooking)
router.post('/passenger', postPassenger)
router.patch('/:id', patchBooking)
router.delete('/:bookingId', deleteBooking)
module.exports = router
