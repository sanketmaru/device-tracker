var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
server.listen(process.env.PORT || 8082);

io.sockets.on('connection', function (socket) {
  socket.on('location', function (data) {
    io.sockets.emit('location', data);
  });
});

app.get('/', function(req, res) {
  //send the index.html in our public directory
  res.sendfile('./public/index.html');
});