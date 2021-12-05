const express = require('express')
const app = express()
const http = require('http');
const { dirname } = require('path');
const server = http.createServer(app)
const { Server } = require("socket.io");
const io = new Server(server);


app.use(express.static(__dirname + '/public'))
console.log(__dirname)
console.log(__dirname + '/public')

app.get('/controller', function(request, response){
    response.sendFile(__dirname + '/public/nipple.html')
})

app.get('/', function(request, response){
    response.sendFile(__dirname + '/public/index.html')
})

io.on('connection', (socket) => {
    console.log('a user connected', socket.id); //socket id diferentes
    //socket.on('disconnect', () => {
    //  console.log('user disconnected');
    //})
    socket.on('startGame',() =>{
        console.log('Game Start')
        io.emit('startedGame')
    })
    socket.on('playerPosition',(players) =>{
        console.log(`Position player1: ${players.player1}`)
        console.log(`Position player2: ${players.player2}`)
        io.emit('playersAtualizacoes', players)
    })
    socket.on('ballPosition', (bola) => {
        console.log(`Ball position: ${bola}`)
        io.emit('ballPosit', bola)
    })
})


server.listen(3000, ()=> {
    console.log("Server is up")
})
