const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const routesNavigation = require('./src/routesNavigation')

app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: 'false' }))
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Request-With, Content-Type, Accept, Authorization'
  )
  next()
})
app.use('/', routesNavigation)

app.get('*', (req, res) => {
  res.status(404).send('path not found')
})

app.listen(3000, () => {
  console.log('express is listening on port 3000')
})
