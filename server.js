var express = require('express');
var app = express();
var server = require('http').createServer(app);  
var io = require('socket.io')(server);

var Twitter = require('twitter');
var client = new Twitter({
  consumer_key: 'cwp0ifDWfOJYKbJWcjSxTW9M7',
  consumer_secret: 'ev54lljDDar3n9QuA8E3pOHHppcUpIbNXt2CQ3rwlGnJV3NIRH',
  access_token_key: '3341047145-C0UZ7wWTQlJqQQogZSWp5aKeDekWYEmpS5UAptF',
  access_token_secret: 'zs2ER8NbcKKosw3nnHOH7VBQEj1d3dfLO3lCnkSXupVIa'
});

// je déclare mes fichiers statiques
app.use('/app', express.static('./client/app'));
// app.use('/css', express.static('./client/css'));
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/client/index.html')
});

server.listen(3000, function() {
            console.log('listening on 3000');
});
io.sockets.on('connection', function (socket) {
    console.log("un client est connecté");
    socket.emit('monsocket', { hello: "world" });
});
// You can also get the stream in a callback if you prefer. 
client.stream('statuses/filter', {track: 'javascript'}, function(stream) {
  stream.on('data', function(event) {
    console.log(event && event.text);
    io.sockets.emit('newTwit', event);
  }); 
  stream.on('error', function(error) {
    throw error;
  });
});

