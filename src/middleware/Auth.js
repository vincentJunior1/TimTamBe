const helper = require('../helper/response')
const jwt = require('jsonwebtoken')

module.exports = {
  authorization: (req, res, next) => {
    let token = req.headers.authorization
    if (token) {
      token = token.split(' ')[1]
      jwt.verify(token, 'Sky_Router', (error, result) => {
        if (
          (error && error.name === 'JsonWebTokenError') ||
          (error && error.name === 'TokenExpiredError')
        ) {
          return helper.response(res, 403, error.message)
        } else {
          req.decodeToken = result
          next()
        }
      })
    }
  }
}
