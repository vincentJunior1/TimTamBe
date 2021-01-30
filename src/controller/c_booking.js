const {
  getBooking,
  getPassenger,
  getBookingId,
  postBooking,
  patchBooking,
  postPassenger,
  deleteBooking,
  deletePassenger
} = require('../model/m_booking')
const { response } = require('../helper/response')

module.exports = {
  getBooking: async (req, res) => {
    try {
      const { id } = req.params
      let { status } = req.query
      status = parseInt(status)
      const result = await getBooking(id, status)
      return response(res, 200, 'success get data', result)
    } catch (error) {
      return response(res, 400, 'Bad request', error)
    }
  },
  getPassenger: async (req, res) => {
    try {
      const { bookingId } = req.params
      const result = await getPassenger(bookingId)
      return response(res, 200, 'success get data', result)
    } catch (error) {
      return response(res, 400, 'Bad request', error)
    }
  },
  postBooking: async (req, res) => {
    try {
      const { userId, scheduleId, total, insurance, status } = req.body
      const data = {
        userId,
        orderId: new Date().toISOString().replace(/[-:.ZT]/g, ''),
        scheduleId,
        total,
        insurance,
        status
      }
      const result = await postBooking(data)
      return response(res, 200, 'success post data', result)
    } catch (error) {
      return response(res, 400, 'Bad request', error)
    }
  },
  patchBooking: async (req, res) => {
    try {
      const { id } = req.params
      const result = await patchBooking(id)
      return response(res, 200, 'success update status ', result)
    } catch (error) {
      return response(res, 400, 'Bad request', error)
    }
  },
  postPassenger: async (req, res) => {
    try {
      const id = await getBookingId()
      const key = id[0].bookingId
      const { title, fullname, nationality } = req.body
      const data = { bookingId: key, title, fullname, nationality }
      const result = await postPassenger(data)
      return response(res, 200, 'success post data', result)
    } catch (error) {
      return response(res, 400, 'Bad request', error)
    }
  },
  deleteBooking: async (req, res) => {
    try {
      const { bookingId } = req.params
      await deletePassenger(bookingId)
      const result = await deleteBooking(bookingId)
      return response(res, 200, 'success delete data', result)
    } catch (error) {
      return response(res, 400, 'Bad request', error)
    }
  }
}