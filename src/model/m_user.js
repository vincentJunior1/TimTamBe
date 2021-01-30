const connection = require('../config/mysql')

module.exports = {
  registerUserModel: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO user SET ?', data, (error, result) => {
        if (!error) {
          const newData = {
            ...result.insertId,
            ...data
          }
          resolve(newData)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  cekEmailModel: (email) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM user WHERE user_email = ?',
        email,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  cekCode: (code) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM user WHERE user_code = ?',
        code,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  patchUserModel: (data, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE user SET ? WHERE user_id = ?',
        [data, id],
        (error) => {
          if (!error) {
            resolve(data)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  }
}
