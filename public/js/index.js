var socket = io();
socket.on('connect', function() {
  console.log('connected to server');

  socket.emit('createMessage', {
    from: "seiya",
    text: "Not much"
  });

});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
    console.log('Got message', message);
});
