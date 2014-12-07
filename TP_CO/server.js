var net = require('net');
var fs = require('fs');
var clients = [];

var server = net.createServer(function(socket) {
  	

  	socket.on('end', function() {
    		console.log('Client disconnected');
  	});
	socket.name = socket.remoteAddress+":"+socket.remotePort;
	socket.setEncoding('utf8');
	clients.push(socket);
	console.log('Client connected :'+socket.name);
	socket.on('data',function(data){
		var writer = fs.createWriteStream("serverFile.txt");
		writer.write(data);
		//console.log(data);
	})

});

server.listen(8124, function() { 
  	console.log('server bound');
});