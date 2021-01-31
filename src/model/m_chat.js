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
        'SELECT user_name,user_image,user_id,room.room_chat, room.user_id_from, room.user_id_to, room_updated_at, room_created_at FROM room LEFT JOIN user ON room.user_id_to = user.user_id WHERE room.user_id_from = ? order by room.room_updated_at DESC',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getRoomByNumber: (number) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM chat LEFT JOIN user ON chat.user_id_to = user.user_id WHERE room_chat = ? order by chat_created_at ASC',
        [number],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getLastChat: (roomId) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'select chat_content, chat_created_at from chat where room_chat = ? order by chat_created_at DESC',
        roomId,
        (err, result) => {
          !err ? resolve(result[0]) : reject(new Error(err))
        }
      )
    })
  },
  countNotreadChat: (idRoom, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'select COUNT(*) AS total from chat where room_chat = ? && user_id_from != ? && status_read = "Unread"',
        [idRoom, id],
        (err, result) => {
          !err ? resolve(result) : reject(new Error(err))
        }
      )
    })
  },
  updateStatusRead: (roomId, Id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'update chat set status_read ="Read" where room_chat = ? && user_id_from != ?',
        [roomId, Id],
        (err, result) => {
          !err ? resolve(result) : reject(new Error(err))
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
  },
  updateRoomModel: (data, room) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'update room set ? where room_chat = ?',
        [data, room],
        (err, result) => {
          !err ? resolve(result) : reject(new Error(err))
        }
      )
    })
  }
}
