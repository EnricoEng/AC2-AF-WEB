const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, "public");
const port = process.env.PORT || 3000;
const app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));
server.listen(port, ()=> {
    console.log(`Server is up on port ${port}.`)
});

app.get("/index.html", function(request, response) {
    response.sendFile(__dirname + "/public/index.html");
 });

io.on('connection', (socket) => {
    console.log('A user just connected.');
    socket.on('disconnect', () => {
        console.log('A user has disconnected.');
    })
});

io.on('startGame', () => {
    io.emit('startGame');
})
