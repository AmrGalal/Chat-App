const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const {generateMessage} = require('./utils/message');
var app = express();
var server = http.createServer(app)
const publicPath = process.env.PWD + '/public';
app.use(express.static(publicPath))

var io = socketIo(server); //here we have our web socket server

//register an event listener by io.on
io.on("connection",(socket)=>{ //this listens to the connection event(when a client connects to the server)
  console.log('New user arrived!');

  socket.emit('newMessage',generateMessage("Admin","Welcome to the chat app"));
  socket.broadcast.emit('newMessage',generateMessage("Admin","New user joined the chatroom"))

  socket.on('createMessage',(message)=>{
    console.log('Created a new message ', message);
    socket.broadcast.emit('newMessage',generateMessage(message.from, message.text))
  })
  socket.on('disconnect', (reason) => {
    console.log('User disconnected because ' + reason);
    socket.broadcast.emit('newMessage',generateMessage("Admin","New user left the chatroom"))
  });
})
const port = process.env.PORT || 3000;
server.listen(port,()=> console.log(`Ready`))
