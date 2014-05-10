var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    _ = require('lodash');

var port = process.env.PORT || 1339;
server.listen(port, function() {
    console.log('listening on port ' + port);
});

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/index.html');
});

app.use(express.static(__dirname + '/public'));

var pause_timer = {
    time: 5 * 60,
    state: 'pause',
    color: '#C24641'
};

var work_timer = {
    time: 25 * 60,
    state: 'work',
    color: '#CCFB5D'
};

var timer = _.clone(work_timer);
setInterval(function() {
    timer.time-= 1;


    var event = {
        time: timeString(timer.time),
        color: timer.color
    };

    if (timer.time <= 0 ) {
        event.playSound = 'ding';
    }
    io.sockets.emit('teamodoro:time', event);

    if (timer.time <= 0) {
        changeState();
    }
}, 1000);

function timeString(timer) {
    var minutes = Math.floor(timer / 60);
    var seconds = timer % 60;
    if ((seconds + "").length == 1) {
        seconds = "0" + seconds;
    }

    return minutes + ':' + seconds;
}

function changeState() {
    if (timer.state == 'pause') {
        timer = _.clone(work_timer);
    }
    else {
        timer = _.clone(pause_timer);
    }
}