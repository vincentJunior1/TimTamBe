const connection = require('../config/mysql')

module.exports = {
  createRoomChatModel: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO room SET ?', data, (error, result) => {
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
  cekRoomChatModel: (id, idFrom) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM room WHERE user_id_to = ? AND user_id_from = ?',
        [id, idFrom],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getAllRoomModel: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM room WHERE user_id_from = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getRoomByNumber: (number, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM chat LEFT JOIN user ON chat.user_id_to = user.user_id WHERE user_id_from = ? AND room_chat = ?',
        [id, number],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  sendMessageModel: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO chat SET ?', data, (error, result) => {
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
  }
}
