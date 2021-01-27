const connection = require('../config/mysql')

module.exports = {
  registerUserModel: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO user SET ?', data, (error, result) => {
        console.log(result)
        console.log(error)
      })
    })
  }
}
