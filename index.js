var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('static/index.html');
});

app.get('/static', express.static(__dirname + '/static'));
app.get('/socketio.js', express.static(__dirname + '/node_modules/socket.io-client/socket.io.js'))

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('data', function(data){
      console.log("data received");
    io.emit('data', data); 
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});