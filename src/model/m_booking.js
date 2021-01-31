const { actionQuery } = require('../helper/helper')
module.exports = {
  getBooking: (id, status) => {
    return actionQuery(
      'SELECT * from booking where status = ? and userId = ?',
      [status, id]
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
    return actionQuery('update booking set status = 1 where bookingId= ? ', id)
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
  }
}
