module.exports = {
  response: (res, status, msg, data, pagination) => {
    const result = {}
    result.status = status || 200
    result.message = msg
    result.data = data
    result.pagination = pagination

    return res.status(result.status).json(result)
  }
}
