var socket = io(); //making a request from the client to server to open up a web socket
socket.on('connect',function(){
  console.log('Connected to server');
  socket.emit('createMessage',{
    from: 'ahmedgalal',
    text: 'heyy'
  })
})
socket.on('disconnect',function(){
  console.log('Disconnected from server');
})
socket.on('newMessage',function(message){
  console.log('got a new message ', message);
})
