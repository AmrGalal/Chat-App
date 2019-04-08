const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

var app = express();
var server = http.createServer(app)
const publicPath = process.env.PWD + '/public';
app.use(express.static(publicPath))

var io = socketIo(server); //here we have our web socket server

//register an event listener by io.on
io.on("connection",(socket)=>{ //this listens to the connection event(when a client connects to the server)
  console.log('New user arrived!');
  socket.on('createMessage',(message)=>{
    console.log('Created a new message ', message);
    io.emit('newMessage',{
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    })
  })
  socket.on('disconnect', (reason) => {
    console.log('User disconnected because ' + reason);
  });
})
const port = process.env.PORT || 3000;
server.listen(port,()=> console.log(`Ready`))
