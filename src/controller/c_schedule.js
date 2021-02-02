const { get, getById, post, dataCount } = require('../model/m_schedule')
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
        date,
        inflightMeal,
        wifi,
        luggage,
        direct,
        transit,
        airplanesClass,
        airlanes,
        departureStart,
        departureEnd,
        arrivedStart,
        arrivedEnd,
        sort,
        price
      } = req.query
      page = parseInt(page)
      limit = parseInt(limit)
      const totalData = await dataCount(
        takeoff,
        landing,
        date,
        inflightMeal,
        wifi,
        luggage,
        direct,
        transit,
        airplanesClass,
        airlanes,
        departureStart,
        departureEnd,
        arrivedStart,
        arrivedEnd,
        price
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
        date,
        inflightMeal,
        wifi,
        luggage,
        direct,
        transit,
        airplanesClass,
        airlanes,
        departureStart,
        departureEnd,
        arrivedStart,
        arrivedEnd,
        sort,
        price
      )
      return response(res, 200, 'success get data', result, pageInfo)
    } catch (error) {
      console.log(error)
      return response(res, 400, 'Bad request', error)
    }
  },
  getById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await getById(id)
      return response(res, 200, 'success get data', result)
    } catch (error) {
      return response(res, 400, 'Bad request', error)
    }
  },
  post: async (req, res) => {
    try {
      const {
        airlanes,
        date,
        takeOff,
        takeOffAirport,
        takeOffTime,
        landing,
        landingAirport,
        landingTime,
        Duration,
        luggage,
        inflightMeal,
        wifi,
        direct,
        transit,
        airplanesClass,
        refun,
        reschedule,
        price
      } = req.body

      const data = {
        airlanes,
        date,
        takeOff,
        takeOffAirport,
        takeOffTime,
        landing,
        landingAirport,
        landingTime,
        Duration,
        luggage,
        inflightMeal,
        wifi,
        direct,
        transit,
        airplanesClass,
        refun,
        reschedule,
        price
      }
      const result = await post(data)
      return response(res, 200, 'success post data', result)
    } catch (error) {
      return response(res, 400, 'Bad request', error)
    }
  }
}
