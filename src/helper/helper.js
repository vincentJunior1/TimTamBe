const connection = require('../config/mysql')

module.exports = {
  actionQuery: (...argument) => {
    return new Promise((resolve, reject) => {
      connection.query(...argument, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          console.log(...argument)
          reject(new Error(error))
        }
      })
    })
  }
}
