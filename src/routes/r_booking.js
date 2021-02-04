const router = require('express').Router()
const {
  getBooking,
  getPassenger,
  postBooking,
  patchBooking,
  patchUseBooking,
  postPassenger,
  deleteBooking,
  getBookingById
} = require('../controller/c_booking')
// const { authorization } = require('../middleware/Auth')

router.get('/mybooking/:id', getBooking)
router.get('/passenger/:bookingId', getPassenger)
router.get('/mybookingbyid/:id', getBookingById)
router.post('/mybooking', postBooking)
router.post('/passenger', postPassenger)
router.post('/paymentfinish', patchBooking)
router.patch('/:id', patchUseBooking)
router.delete('/:bookingId', deleteBooking)
module.exports = router
