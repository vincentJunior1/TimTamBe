const helper = require('../helper/response')
const {
  createRoomChatModel,
  cekRoomChatModel,
  getAllRoomModel,
  getRoomByNumber,
  sendMessageModel,
  updateRoomModel,
  updateStatusRead,
  countNotreadChat,
  getLastChat
} = require('../model/m_chat')

module.exports = {
  createRoom: async (req, res) => {
    try {
      const { user_id } = req.decodeToken
      const { user_id_to } = req.body
      const createRoomNumber = Math.floor(Math.random() * 9999)
      const cekRoom = await cekRoomChatModel(user_id_to, user_id)
      if (cekRoom.length <= 0) {
        const roomFrom = {
          room_chat: createRoomNumber,
          user_id_from: user_id,
          user_id_to
        }
        const result = await createRoomChatModel(roomFrom)
        const roomTo = {
          room_chat: createRoomNumber,
          user_id_from: user_id_to,
          user_id_to: user_id
        }
        await createRoomChatModel(roomTo)
        return helper.response(res, 200, 'Sucess Create Room Chat', result)
      } else {
        return helper.response(res, 400, 'Room Already Created')
      }
    } catch (error) {
      return helper.response(res, 400, "Can't make Room Chat Please Try Again")
    }
  },
  getAllRoom: async (req, res) => {
    try {
      const { user_id } = req.decodeToken
      const result = await getAllRoomModel(user_id)
      console.log(result.length)
      if (result.length > 0) {
        for (let i = 0; i < result.length; i++) {
          result[i].unreadmessage = await countNotreadChat(
            result[i].room_chat,
            result[i].user_id_from
          )
          result[i].lastChat = await getLastChat(result[i].room_chat)
        }
        return helper.response(res, 200, 'Sucess Get All Room', result)
      } else {
        return helper.response(res, 404, 'You Not have any room')
      }
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, "Can't Get Any Room", error)
    }
  },
  getRoomByRoomNumber: async (req, res) => {
    try {
      const { user_id } = req.decodeToken
      const { id } = req.params
      const result = await getRoomByNumber(id)
      if (result.length > 0) {
        await updateStatusRead(id, user_id)
        return helper.response(res, 200, 'Sucess Get Room By Number ', result)
      } else {
        return helper.response(res, 404, 'Room Is Gone / Already Deleted')
      }
    } catch (error) {
      return helper.response(res, 400, 'Something Wrong Please Try Again')
    }
  },
  sendMessage: async (req, res) => {
    try {
      const { user_id } = req.decodeToken
      const { id } = req.params
      const { chat_content, user_id_to } = req.body
      if (chat_content === '' || chat_content == null) {
        return helper.response(res, 400, "Can't Send Empty chat ")
      } else {
        const message = {
          room_chat: id,
          user_id_from: user_id,
          user_id_to,
          chat_content
        }
        const setUpdate = {
          room_updated_at: new Date()
        }
        await updateRoomModel(setUpdate, id)
        const result = await sendMessageModel(message)
        return helper.response(res, 200, 'Sucess Send Message', result)
      }
    } catch (error) {
      console.log(error)
      return helper.response(
        res,
        400,
        'Something Wrong Please Try Again',
        error
      )
    }
  }
}
