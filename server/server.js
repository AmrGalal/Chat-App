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

  socket.emit('newMessage',{
    from: "Admin",
    text: "Welcome to the chat app",
    createdAt: new Date().getTime()
  })

  socket.broadcast.emit('newMessage',{
    from: "Admin",
    text: "New user joined the chatroom",
    createdAt: new Date().getTime()
  })

  socket.on('createMessage',(message)=>{
    console.log('Created a new message ', message);
    socket.broadcast.emit('newMessage',{
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    })
  })
  socket.on('disconnect', (reason) => {
    console.log('User disconnected because ' + reason);
    socket.broadcast.emit('newMessage',{
      from: "admin",
      text: "New user left the chatroom",
      createdAt: new Date().getTime()
    })
  });
})
const port = process.env.PORT || 3000;
server.listen(port,()=> console.log(`Ready`))
