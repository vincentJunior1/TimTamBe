const { get, del } = require('../model/m_notif')
const { response } = require('../helper/response')

module.exports = {
  get: async (req, res) => {
    try {
      const { id } = req.params
      const result = await get(id)
      return response(res, 200, 'success get data', result)
    } catch (error) {
      return response(res, 400, 'Bad request', error)
    }
  },
  del: async (req, res) => {
    try {
      const { id } = req.params
      const result = await del(id)
      return response(res, 200, 'success delete', result)
    } catch (error) {
      return response(res, 400, 'Bad request', error)
    }
  }
}
