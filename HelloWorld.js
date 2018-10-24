var http = require('http');
var firstModule = require('./myfirstmodule');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write("The date and time : " + firstModule.myDateTime()+"\n");
    res.end('  Hello World!');
}).listen(8080);
