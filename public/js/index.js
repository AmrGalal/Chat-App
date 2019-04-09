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

socket.on('newLocationMessage',function(message){
  console.log('got a new location message ', message);
  var li = jQuery('<li></li>')
  var a = jQuery('<a target="_blank"> My location </a>')
  a.attr('href',message.url);
  li.text(`${message.from}: `)
  li.append(a)
  jQuery('#messages').append(li);
})

jQuery('#message-form').on('submit',function(e){
  var messageTextBox = jQuery('[name=message]')
  // console.log('button pressed');
  e.preventDefault();
  socket.emit('createMessage',{
    from: 'User',
    text: messageTextBox.val()
  }, function(){
  })
  messageTextBox.val('')
})

var locationButton = jQuery('#send-location')
locationButton.on('click', function(){
  if(!navigator.geolocation)
    alert('Geolocation isn\'t supported by your browser')
  else{
    locationButton.attr('disabled','disabled').text('Sending location...');
    navigator.geolocation.getCurrentPosition(function(position) {
      locationButton.removeAttr('disabled').text('Send Location');
      var lat = position.coords.latitude
      var long = position.coords.longitude
      socket.emit('createLocationMessage',{
        lat,
        long
      });
    }, function(){
      locationButton.attr('disabled','disabled').text('Send Location');
      alert('Couldn\'t get the location, Send location button is now disabled')
    });
  }

})
