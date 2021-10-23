const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)

app.get('/', (request, response)=>{
    console.log('hello world')
})


server.listen(3000, ()=> {
    console.log("Server is up")
})