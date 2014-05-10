var app = require('express')(),
    server = require('http').createServer();

app.listen(3000);

app.get('/', function(req, res){
    res.send('hello world');
});