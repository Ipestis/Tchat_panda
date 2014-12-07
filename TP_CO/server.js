var net = require('net');
var fs = require('fs');
var clients = [];

var server = net.createServer(function(socket) {
  	

  	socket.on('end', function() {
    		console.log('Client disconnected');
  	});
	socket.name = socket.remoteAddress+":"+socket.remotePort;
	socket.fileName="defaultfileName.txt";
	socket.setEncoding('utf8');
	clients.push(socket);
	console.log('Client connected :'+socket.name);
	socket.on('data',function(data){
		if(data.indexOf("fileName=")==0){
			socket.fileName=data.substring(9);
			console.log("file name changed to "+socket.fileName);
		}
		else{
			var writer = fs.createWriteStream(socket.fileName);
			writer.write(data);
		}
		//console.log(data);
	})

});

server.listen(8124, function() { 
  	console.log('server bound');
});