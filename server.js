var app = require('express')(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/index.html');
});

server.listen(1339);

var timer = 15 * 60;

io.sockets.on('connection', function(socket) {
    console.log('hello mister');
});

setInterval(function() {
    timer -= 1;
    var minutes = Math.floor(timer / 60);
    var seconds = timer % 60;

    io.sockets.emit('teamodoro:time', minutes + ':' + seconds);

    console.log(minutes + ':' + seconds);
}, 1000);