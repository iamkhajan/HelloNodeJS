const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });
wss.on('connection', function connection(ws){
  console.log('client connected');
  ws.on('message', function incoming(message){
    console.log('received: %s', message);
  });

  ws.on('message', function(msg){
      console.log('message from client is here :: ', msg);
    });

    ws.send('message to client sent');
});
