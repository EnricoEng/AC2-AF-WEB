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
    console.log('a user connected', socket.id); //socket id diferentes
    //socket.on('disconnect', () => {
    //  console.log('user disconnected');
    //})
    socket.on('start',() =>{
        console.log('Game Start')
    })
})


server.listen(3000, ()=> {
    console.log("Server is up")
})
