var fs = require('fs'), http = require('http') , socketio = require('socket.io');

var server = http.createServer(function(req, res) {

	res.writeHead(200, { 'Content-type': 'text/html'});
	
	res.end(fs.readFileSync(__dirname + '/speechApp.html'));

}).listen(process.env.PORT, function() {console.log('Listening at:' + process.env.PORT);});
 
 
socketio.listen(server).on('connection', function (socket) {
	
	socket.on('message', function (msg) {
		console.log('Message Received: ', msg);
		
		//Broadcast to all clients
		socket.broadcast.emit('message', msg);
	});
socketio.configure(function() {
  socketio.set('transports', ['websocket']);
});
	
});