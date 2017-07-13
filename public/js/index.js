var socket = io();

function scrollToBottom() {
  var messages = $('#messages');
  var newMessage = messages.children('li:last-child');

  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();
  if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function() {
  console.log('connected to server');
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
    var formatttedTime = moment(message.createdAt).format('h:mm a');
    var template =  $('#message-template').html();
    var html = Mustache.render(template,  {
      text: message.text,
      from: message.from,
      createdAt: formatttedTime
    });

    $('#messages').append(html);
    scrollToBottom();
    // var li = $('<li></li>');
    // li.text(`${message.from}  ${formatttedTime}: ${message.text}`);
    // $('#messages').append(li);
});

socket.on('newLocationMessage', (message) => {
  var formatttedTime = moment(message.createdAt).format('h:mm a');
  var template =  $('#location-message-template').html();
  var html = Mustache.render(template,  {
    from: message.from,
    createdAt: formatttedTime,
    url: message.url
  });

  $('#messages').append(html);
  scrollToBottom();
  // var li = $('<li></li>');
  // var a = $('<a target="_blanck">My current location</a>')
  // var formatttedTime = moment(message.createdAt).format('h:mm a');
  //
  // li.text(`${message.from} ${formatttedTime}: `);
  // a.attr('href', message.url);
  // li.append(a);
  // $('#messages').append(li);
});

$('#message-form').on('submit', function(e) {
  e.preventDefault();

  var messageTextbox = $('[name=message]');

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function() {
    messageTextbox.val('');
  });
});

var locationButton = $('#send-location');
locationButton.on('click', function() {
  if (!navigator.geolocation) {
    return alert('geolocation not supported by your browser');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function(position) {
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function() {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location.');
  })
});
