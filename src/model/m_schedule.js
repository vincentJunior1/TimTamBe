const connection = require('../config/mysql')
const { actionQuery } = require('../helper/helper')
module.exports = {
  get: (
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
  ) => {
    const meal = inflightMeal === 1 ? ' and inflightMeal = 1' : ''
    const wi = wifi === 1 ? ' and wifi = 1' : ''
    const lug = luggage === 1 ? ' and luggage = 1' : ''
    const dir = direct === 1 ? ' and direct = 1' : ''
    const trans = transit !== '' ? ` and transit = '${transit}'` : ''
    const air = airlanes !== undefined ? ` and airlanes = '${airlanes}'` : ''
    const departure =
      departureStart !== ''
        ? ` and takeOffTime between '${departureStart}' and '${departureEnd}'`
        : ''
    const arrived =
      arrivedStart !== ''
        ? `and landingTime between '${arrivedStart}' and '${arrivedEnd}'`
        : ''
    const order = sort !== '' ? ` order by ${sort} DESC` : ''
    return actionQuery(
      `select * from schedule where takeOff = '${takeoff}' and landing = '${landing}' ${meal}${wi}${lug}${dir}${trans}${air}${departure}${arrived} ${order} LIMIT ${limit} OFFSET ${offset}`
    )
  },
  dataCount: (
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
  ) => {
    return new Promise((resolve, reject) => {
      const meal = inflightMeal === 1 ? 'and inflightMeal = 1' : ''
      const wi = wifi === 1 ? ' and wifi = 1' : ''
      const lug = luggage === 1 ? ' and luggage = 1' : ''
      const dir = direct === 1 ? ' and direct = 1' : ''
      const trans = transit !== '' ? ` and transit = '${transit}'` : ''
      const air = airlanes !== undefined ? ` and airlanes = '${airlanes}'` : ''
      const departure =
        departureStart !== ''
          ? ` and takeOffTime between '${departureStart}' and '${departureEnd}'`
          : ''
      const arrived =
        arrivedStart !== ''
          ? ` and landingTime between '${arrivedStart}' and '${arrivedEnd}'`
          : ''
      // const order = sort != null ? ` order by '${sort}'` : ''
      connection.query(
        `select count(*) as total from schedule where takeOff = '${takeoff}' and landing = '${landing}' ${meal}${wi}${lug}${dir}${trans}${air}${departure}${arrived}`,
        (error, result) => {
          !error ? resolve(result[0].total) : reject(new Error(error))
          // if (!error) {
          //   console.log(result[0])
          //   resolve(result[0].total)
          // } else {
          //   reject(new Error(error))
          // }
        }
      )
    })
  }
}
