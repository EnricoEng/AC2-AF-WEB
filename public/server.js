const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static('public'))

app.get('/', function(request, response){
    response.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    })
    socket.on('clientToServer',data =>{
        console.log(data)
    })
    socket.on('clientToClient',data =>{
        socket.broadcast.emit('serveToClient',data)
    })
})

io.on('connection', (socket) => {
    socket.on('sendMessage', ()=>{
        io.emit('funciona desgraça')
    })
})

server.listen(3000, ()=> {
    console.log("Server is up")
})
