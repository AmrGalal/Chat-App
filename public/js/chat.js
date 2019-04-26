var socket = io(); //making a request from the client to server to open up a web socket
var userName = "temp";
socket.on('connect',function(){
  console.log('Connected to server');
  var params = jQuery.deparam(window.location.search);
  socket.emit('join',params,function(err){
    if(err){
      alert(err);
      window.location.href = '/';
    }else userName = params.name;
  });
})

socket.on('disconnect',function(){
  console.log('Disconnected from server');
})

socket.on('newMessage',function(message){
  console.log('got a new message ', message);
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template,{
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  })
  jQuery('#messages').append(html);
})

socket.on('newLocationMessage',function(message){
  console.log('got a new location message ', message);
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template,{
    text: message.text,
    from: message.from,
    url: message.url
  })
  jQuery('#messages').append(html);
})

socket.on('updateUserList',function(namesList){
  console.log('namesList', namesList);
  var ol = jQuery('<ol></ol>');
  namesList.forEach(function(name){
    ol.append(jQuery('<li></li>').text(name));
  })
  jQuery('#users').html(ol);
})

jQuery('#message-form').on('submit',function(e){
  var messageTextBox = jQuery('[name=message]')
  // console.log('button pressed');
  e.preventDefault();
  socket.emit('createMessage',{
    from: userName,
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
