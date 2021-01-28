const { get, dataCount } = require('../model/m_schedule')
const { response } = require('../helper/response')
const qs = require('querystring')

module.exports = {
  get: async (req, res) => {
    try {
      let {
        page,
        limit,
        takeoff,
        landing,
        inflightMeal,
        wifi,
        luggage,
        direct,
        transit,
        airlanes,
        departureStart,
        departureEnd,
        arrivedStart,
        arrivedEnd,
        sort
      } = req.body
      page = parseInt(page)
      limit = parseInt(limit)
      const totalData = await dataCount(
        takeoff,
        landing,
        inflightMeal,
        wifi,
        luggage,
        direct,
        transit,
        airlanes,
        departureStart,
        departureEnd,
        arrivedStart,
        arrivedEnd
      )
      const totalPage = Math.ceil(totalData / limit)
      const offset = page * limit - limit
      const prevLink =
        page > 1 ? qs.stringify({ ...req.query, ...{ page: page - 1 } }) : null
      const nextLink =
        page < totalPage
          ? qs.stringify({ ...req.query, ...{ page: page + 1 } })
          : null
      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData,
        nextLink:
          nextLink &&
          `http://localhost:${process.env.PORT}/product?${nextLink}`,
        prevLink:
          prevLink && `http://localhost:${process.env.PORT}/product?${prevLink}`
      }

      const result = await get(
        offset,
        limit,
        takeoff,
        landing,
        inflightMeal,
        wifi,
        luggage,
        direct,
        transit,
        airlanes,
        departureStart,
        departureEnd,
        arrivedStart,
        arrivedEnd,
        sort
      )
      console.log(sort)
      return response(res, 200, 'success get data', result, pageInfo)
    } catch (error) {
      console.log(error)
      return response(res, 400, 'Bad request', error)
    }
  }
}
