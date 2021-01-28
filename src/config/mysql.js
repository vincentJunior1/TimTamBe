const mysql = require('mysql')
require('dotenv').config()
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
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
