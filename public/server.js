const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)

app.use(express.static('public'))

app.get('/index', function(request, response){
    response.sendFile(__dirname + '/index.html')
})


server.listen(3000, ()=> {
    console.log("Server is up")
})
