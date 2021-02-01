const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const socket = require('socket.io')
const routesNavigation = require('./src/routesNavigation')
const dotenv = require('dotenv')
dotenv.config()

app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: 'false' }))
app.use(express.static('uploads'))
const http = require('http')
const server = http.createServer(app)
const io = socket(server, {
  cors: {
    origin: '*'
  }
})
io.on('connection', (socket) => {
  console.log('Socket.Io Connect')
  socket.on('globalMessage', (data) => {
    io.emit('chatMessage', data)
  })
  socket.on('privateMessage', (data) => {
    socket.emit('chatMessage', data)
  })
  socket.on('broadcastMessage', (data) => {
    socket.broadcast.emit('chatMessage', data)
  })
  socket.on('joinRoom', (data) => {
    socket.join(data.room_chat)
  })
  socket.on('leaveRoom', (data) => {
    socket.leave(data)
  })
  socket.on('changeRoom', (data) => {
    socket.leave(data.oldRoom)
    socket.join(data.room_chat)
  })
  socket.on('roomMessage', (data) => {
    io.to(data.room_chat).emit('chatMessage', data)
  })
  socket.on('typing', (data) => {
    socket.broadcast.to(data.room_chat).emit('typingMessage', data)
  })
})
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

server.listen(process.env.PORT, () => {
  console.log(`express is listening ${process.env.PORT}`)
})
