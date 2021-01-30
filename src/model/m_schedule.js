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
    sort,
    price
  ) => {
    const split = airlanes.split(',')
    const first = split !== undefined ? split[0] : ''
    let str = ''
    for (let i = 0; i < split.length; i++) {
      str += `OR airlanes= '${split[i]}' `
    }
    let air = ''
    if (split.length !== 0) {
      if (split.length === 1) {
        air = `or airlanes= '${airlanes}' `
      } else {
        air = str
      }
    }
    const meal = inflightMeal === 1 ? ' and inflightMeal = 1' : ''
    const wi = wifi === '1' ? ' and wifi = 1' : ''
    const lug = luggage === '1' ? ' and luggage = 1' : ''
    const dir = direct === '1' ? ' and direct = 1' : ''
    const trans = transit !== '' ? ` and transit = '${transit}'` : ''
    const departure =
      departureStart !== ''
        ? ` and takeOffTime between '${departureStart}' and '${departureEnd}'`
        : ''
    const arrived =
      arrivedStart !== ''
        ? `and landingTime between '${arrivedStart}' and '${arrivedEnd}'`
        : ''
    const order = sort !== '' ? ` order by ${sort}` : ''
    const pricing = price !== '' ? ` and price between 0 and ${price}` : ''
    return actionQuery(
      `select * from schedule where takeOff = '${takeoff}' and landing = '${landing}' and (airlanes LIKE '%${first}%' ${air}) ${meal}${wi}${lug}${dir}${trans}${departure}${arrived}${pricing} ${order} LIMIT ${limit} OFFSET ${offset}`
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
    arrivedEnd,
    price
  ) => {
    return new Promise((resolve, reject) => {
      const split = airlanes.split(',')
      const first = split !== undefined ? split[0] : ''
      let str = ''
      for (let i = 0; i < split.length; i++) {
        str += `OR airlanes= '${split[i]}' `
      }
      let air = ''
      if (split.length !== 0) {
        if (split.length === 1) {
          air = `or airlanes= '${airlanes}' `
        } else {
          air = str
        }
      }
      const meal = inflightMeal === '1' ? 'and inflightMeal = 1' : ''
      const wi = wifi === '1' ? ' and wifi = 1' : ''
      const lug = luggage === '1' ? ' and luggage = 1' : ''
      const dir = direct === '1' ? ' and direct = 1' : ''
      const trans = transit !== '' ? ` and transit = '${transit}'` : ''
      const departure =
        departureStart !== ''
          ? ` and takeOffTime between '${departureStart}' and '${departureEnd}'`
          : ''
      const arrived =
        arrivedStart !== ''
          ? ` and landingTime between '${arrivedStart}' and '${arrivedEnd}'`
          : ''
      const pricing = price !== '' ? ` and price between 0 and ${price}` : ''
      connection.query(
        `select count(*) as total from schedule where takeOff = '${takeoff}' and landing = '${landing}' and (airlanes LIKE '%${first}%' ${air}) ${meal}${wi}${lug}${dir}${trans}${departure}${arrived}${pricing}`,
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
