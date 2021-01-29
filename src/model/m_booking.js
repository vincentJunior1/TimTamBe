const { actionQuery } = require('../helper/helper')
module.exports = {
  getBookingId: () => {
    return actionQuery(
      'SELECT bookingId FROM booking ORDER BY bookingId DESC LIMIT 1'
    )
  },
  postBooking: (data) => {
    return actionQuery('insert into booking set ?', data)
  },
  postPassenger: (data) => {
    return actionQuery('insert into passenger set ?', data)
  }
}
