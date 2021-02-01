const {
  getBooking,
  getBookingByUserId,
  getPassenger,
  getBookingId,
  postBooking,
  patchBooking,
  postNotif,
  postPassenger,
  deleteBooking,
  deletePassenger,
  paymentGatewayModel
} = require('../model/m_booking')
const midtransClient = require('midtrans-client')
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
  getBookingById: async (req, res) => {
    try {
      const { id } = req.params

      const result = await getBookingByUserId(id)
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
      const payment = await paymentGatewayModel(data.orderId, total)
      const dataNotif = {
        userId,
        title: 'Tickets  Booked',
        text: `Finish Your Payment in this link ${payment}`
      }
      await postNotif(dataNotif)
      await postBooking(data)
      return response(res, 200, 'success post data', payment)
    } catch (error) {
      return response(res, 400, 'Bad request', error)
    }
  },
  patchBooking: async (req, res) => {
    try {
      const { user_id } = req.decodeToken
      const snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: 'SB-Mid-server-i5Ea0d6uzEBfXIa1yGPrviwO',
        clientKey: 'SB-Mid-client-SGuknvb1p9N631nP'
      })
      snap.transaction.notification(req.body).then(async (statusResponse) => {
        const orderId = statusResponse.order_id
        const transactionStatus = statusResponse.transaction_status
        const fraudStatus = statusResponse.fraud_status
        if (transactionStatus === 'capture') {
          if (fraudStatus === 'challenge') {
            const data = {
              userId: user_id,
              title: 'Congratulation',
              text:
                'booking paid off, Sed ut perspiciatis unde omnis iste natus error sit voluptatem'
            }
            await postNotif(data)
            const result = await patchBooking(orderId)
            return response(res, 200, 'success update status ', result)
          } else if (fraudStatus === 'accept') {
            const data = {
              userId: user_id,
              title: 'Congratulation',
              text:
                'booking paid off, Sed ut perspiciatis unde omnis iste natus error sit voluptatem'
            }
            await postNotif(data)
            const result = await patchBooking(orderId)
            return response(res, 200, 'success update status ', result)
          }
        } else if (transactionStatus === 'settlement') {
          const data = {
            userId: user_id,
            title: 'Congratulation',
            text:
              'booking paid off, Sed ut perspiciatis unde omnis iste natus error sit voluptatem'
          }
          await postNotif(data)
          const result = await patchBooking(orderId)
          return response(res, 200, 'success update status ', result)
        } else if (transactionStatus === 'deny') {
          // TODO you can ignore 'deny', because most of the time it allows payment retries
          // and later can become success
          console.log('oke')
        } else if (
          transactionStatus === 'cancel' ||
          transactionStatus === 'expire'
        ) {
          return response(res, 400, 'Failed To Pay')
        } else if (transactionStatus === 'pending') {
          return response(res, 402, 'Waiting for payment')
        }
      })
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
