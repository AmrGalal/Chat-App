const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const {generateMessage,generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/Users');

var app = express();
var server = http.createServer(app)
const publicPath = process.env.PWD + '/public';
app.use(express.static(publicPath))

var io = socketIo(server); //here we have our web socket server
var usersList = new Users();

//register an event listener by io.on
io.on("connection",(socket)=>{ //this listens to the connection event(when a client connects to the server)
  console.log('New user arrived!');

  var userName = "temp", roomName = "temp";
  socket.on('join',(params,callback)=>{
    if(!isRealString(params.name) || !isRealString(params.room)) return callback('name and room name are required');

    userName = params.name;
    roomName = params.room;
    socket.join(roomName);
    usersList.removeUser(socket.id); //remove the user from any potential rooms
    usersList.addUser(socket.id,userName,roomName);
    io.to(roomName).emit('updateUserList',usersList.getUserList(roomName)); //send everyone in the room
    socket.emit('newMessage',generateMessage("Admin","Welcome to the chat app")); //send to me only
    //send to all but me
    socket.broadcast.to(roomName).emit('newMessage',generateMessage("Admin",`${userName} joined the chatroom`))
    //can leave room by socket.leave('room name')
    callback();

  })
  socket.on('createMessage',(message, callback)=>{
    console.log('Created a new message ', message);
    io.to(roomName).emit('newMessage',generateMessage(message.from, message.text))
    callback()
  })

  socket.on('createLocationMessage',(coords)=>{
    console.log('Created a new location message ', coords);
    io.to(roomName).emit('newLocationMessage',generateLocationMessage("Admin", coords.lat,coords.long))
  })

  socket.on('disconnect', (reason) => {
    var user = usersList.removeUser(socket.id);
    if(user){
      console.log('User disconnected because ' + reason);
      io.to(roomName).emit('updateUserList',usersList.getUserList(roomName)); //send everyone in the room
      socket.broadcast.to(roomName).emit('newMessage',generateMessage("Admin",`${userName} left the chatroom`))
    }
  });
})
const port = process.env.PORT || 3000;
server.listen(port,()=> console.log(`Ready`))
