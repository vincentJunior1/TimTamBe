const mysql = require('mysql')
require('dotenv').config()
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'skyrouter',
  timezone: 'UTC'
})

connection.connect((error) => {
  if (error) {
    throw error
  } else {
    console.log('You Are Connected')
  }
})

module.exports = connection
