const {
  getBookingId,
  postBooking,
  postPassenger
} = require('../model/m_booking')
const { response } = require('../helper/response')

module.exports = {
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
      console.log(error)
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
      console.log(error)
      return response(res, 400, 'Bad request', error)
    }
  }
}
