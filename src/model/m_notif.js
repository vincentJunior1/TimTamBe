const { actionQuery } = require('../helper/helper')
module.exports = {
  get: (id) => {
    return actionQuery('select * from notification where userId= ?', id)
  },
  del: (id) => {
    return actionQuery('delete from notification where userId= ?', id)
  }
}
