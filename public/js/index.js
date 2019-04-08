// const {generateMessage} = require('./../../server/utils/message');
var socket = io(); //making a request from the client to server to open up a web socket
socket.on('connect',function(){
  console.log('Connected to server');
})
socket.on('disconnect',function(){
  console.log('Disconnected from server');
})
socket.on('newMessage',function(message){
  console.log('got a new message ', message);
  var li = jQuery('<li></li>')
  li.text(`${message.from}: ${message.text}`)
  jQuery('#messages').append(li);
})

// socket.emit('createMessage',{
//   from: 'Adam',
//   text: 'Hi'
// }, function(){
//     console.log('all is good');
// })

jQuery('#message-form').on('submit',function(e){
  // console.log('button pressed');
  e.preventDefault();
  socket.emit('createMessage',{
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function(){

  })
})
