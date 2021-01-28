const helper = require('../helper/response')
const {
  createRoomChatModel,
  cekRoomChatModel,
  getAllRoomModel
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
      if (result.length > 0) {
        return helper.response(res, 200, 'Sucess Get All Room', result)
      } else {
        return helper.response(res, 404, 'You Not have any room')
      }
    } catch (error) {
      return helper.response(res, 400, "Can't Get Any Room", error)
    }
  }
}
