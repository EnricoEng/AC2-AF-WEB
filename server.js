const express = require('express')
const app = express()
const http = require('http');
const { dirname } = require('path');
const server = http.createServer(app)
const { Server } = require("socket.io");
const io = new Server(server);
const maxRes = 0;
let players_socket = new Array();

app.use(express.static(__dirname + '/public'))
console.log(__dirname)
console.log(__dirname + '/public')

app.get('/controller', function(request, response){
    response.sendFile(__dirname + '/public/nipple.html')
})

app.get('/', function(request, response){
    response.sendFile(__dirname + '/public/index.html')
})

const listaJogadores = [];
setInterval(()=>{
    console.log(listaJogadores)
}, 5000)
io.on('connection', (socket) => {
    console.log(listaJogadores.includes(socket.id))
    
    socket.on('adicionarJogador', ()=>{
        if(!listaJogadores.includes(socket.id)){
            listaJogadores.push(socket.id)
            
            io.emit('adicionarPlayer', {id:socket.id, quantidade: listaJogadores.length})
        }
    })
    socket.on('moverJogador', (posicoes)=>{
        io.emit('atualizarPosicao', {
            id: socket.id,
            ...posicoes
        })
    })
    console.log('a user connected', socket.id); 
    players_socket.push(socket.id);
    console.log(`Tamanho do array de players: ${players_socket}`);
    io.emit('qtdPlayers', players_socket);
    //socket id diferentes
    //socket.on('disconnect', () => {
    //  console.log('user disconnected');
    //})
    socket.on('startGame',() =>{
        console.log('Game Start')
        io.emit('startedGame')
    })
    socket.on('TuEsControlador1', ()=>{
        console.log('chamando Controlador 1')
        socket.emit('Controlador1')
    })
    socket.on('Nippleplayer1Position', (position)=>{
        console.log('Server Nippleplayer1Position')
        socket.emit('Nippleplayer1Position', position)
    })

   // socket.on('playerPosition',(players) =>{
    //    console.log(`Position player1: ${players.player1}`)
   //     console.log(`Position player2: ${players.player2}`)
   //     io.emit('playersAtualizacoes', players)
  //  })
    socket.on('ballPosition', (bola) => {
        //console.log(`Ball position: ${bola}`)
        io.emit('ballPosit', bola)
    })
})

io.on('windowUpdate',(msg)=>{
    console.log(`mensagem: ${msg}`);
    maxRes += msg;
    io.emit('screenResize',maxRes)
})

server.listen(3000, ()=> {
    console.log("Server is up")
})
