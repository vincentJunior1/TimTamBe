const router = require('express').Router()
const {
  getBooking,
  getPassenger,
  postBooking,
  patchBooking,
  postPassenger,
  deleteBooking,
  getBookingById
} = require('../controller/c_booking')
const { authorization } = require('../middleware/Auth')

router.get('/mybooking/:id', getBooking)
router.get('/passenger/:bookingId', getPassenger)
router.get('/mybookingbyid/:id', getBookingById)
router.post('/mybooking', authorization, postBooking)
router.post('/passenger', authorization, postPassenger)
router.post('/paymentfinish', patchBooking)
router.delete('/:bookingId', deleteBooking)
module.exports = router
