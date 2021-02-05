const { actionQuery } = require('../helper/helper')
const midTransClient = require('midtrans-client')
module.exports = {
  getBooking: (id) => {
    // where booking.status = ? and
    // 'SELECT * FROM booking JOIN passenger ON booking.bookingId = passenger.bookingId JOIN schedule ON booking.scheduleId = schedule.scheduleId where booking.userId = ?',
    return actionQuery(
      'SELECT * FROM booking JOIN schedule ON booking.scheduleId = schedule.scheduleId where booking.userId = ?',
      id
      // [status, id]
    )
  },
  getBookingByUserId: (id) => {
    return actionQuery(
      'SELECT * from booking join schedule on booking.scheduleId = schedule.scheduleId where userId = ?',
      id
    )
  },
  getBookingById: (id) => {
    return actionQuery('SELECT * from booking where bookingId= ?', id)
  },
  getPassenger: (bookingId) => {
    return actionQuery('SELECT * from passenger where bookingId = ?', bookingId)
  },
  getBookingId: () => {
    return actionQuery(
      'SELECT bookingId FROM booking ORDER BY bookingId DESC LIMIT 1'
    )
  },
  postBooking: (data) => {
    return actionQuery('insert into booking set ?', data)
  },
  patchBooking: (id) => {
    return actionQuery('update booking set status = 1 where orderId= ? ', id)
  },
  patchUseBooking: (id) => {
    return actionQuery('update booking set flight = 1 where bookingId= ? ', id)
  },
  getUserId: (id) => {
    return actionQuery('SELECT * FROM booking WHERE orderId = ?', id)
  },
  postPassenger: (data) => {
    return actionQuery('insert into passenger set ?', data)
  },
  postNotif: (data) => {
    return actionQuery('insert into notification set ?', data)
  },
  deleteBooking: (id) => {
    return actionQuery('delete from booking where bookingId= ?', id)
  },
  deletePassenger: (bookingId) => {
    return actionQuery('delete from passenger where bookingId= ?', bookingId)
  },
  paymentGatewayModel: (bookingId, total) => {
    return new Promise((resolve, reject) => {
      const snap = new midTransClient.Snap({
        isProduction: false,
        serverKey: 'SB-Mid-server-i5Ea0d6uzEBfXIa1yGPrviwO',
        clientKey: 'SB-Mid-client-SGuknvb1p9N631nP'
      })
      const parameter = {
        transaction_details: {
          order_id: bookingId,
          gross_amount: total
        },
        credit_card: {
          secure: true
        }
      }
      snap
        .createTransaction(parameter)
        .then((transaction) => {
          // transaction redirect_url
          const redirectUrl = transaction.redirect_url
          resolve(redirectUrl)
        })
        .catch((error) => {
          reject(new Error(error))
        })
    })
  }
}
