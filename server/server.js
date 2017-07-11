const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
var port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage',{
    from: 'Admin',
    text: 'Welcome to the chat app',
    cretedAt: new Date().getTime()
  });

  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'New user joined',
    cretedAt: new Date().getTime()
  });

  socket.on('createMessage', (message) => {
    console.log("Got new messge", message);

    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      cretedAt: new Date().getTime()
    });

    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   cretedAt: new Date().getTime()
    // });
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from client');
  });
});

server.listen(port, () => {
  console.log(`Started at port ${port}`);
});
