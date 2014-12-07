var net = require('net');
var fs = require('fs');
var clients = [];

var server = net.createServer(function(socket) {
  	console.log('server connected');

  	socket.on('end', function() {
    		console.log('server disconnected');
  	});
	socket.name = socket.remoteAddress+":"+socket.remotePort;
  	socket.write('hello\r\nFichier a envoyer: \n');
	//socket.pipe(socket);
	clients.push(socket);

	socket.on('data',function(data){
		//var fichier = data.toString().trim();
		var readstream = data;
		fs.appendFile("fichier.txt", data);
		/*var writestream = fs.createWriteStream("fichier.txt");
		readstream.pipe(writestream);
		*/
		fs.readFile("fichier.txt", function(err, data) {
			console.log("Contenu du fichie: ");
			console.log(data.toString());
		});
	})

	function broadcast(message,sender){
		for( a in clients){
			if(a!=sender){
				clients[a].write(message);
			}
		}
	}
});

server.listen(8124, function() { 
  	console.log('server bound');
});