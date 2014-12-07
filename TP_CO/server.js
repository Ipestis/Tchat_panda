var net = require('net');
var fs = require('fs');
require("./styles.js").add_theme();
var clients = [];

//Création du serveur
var server = net.createServer(function(socket) {
	
	//Message en cas de déconnection
  	socket.on('end', function() {
    		console.log('Client disconnected');
  	});
	
	//Definition des paramètres des sockets
	socket.name = socket.remoteAddress+":"+socket.remotePort;
	socket.fileName="defaultFileName.txt";
	socket.setEncoding('utf8');
	clients.push(socket);
	
	//Connexion d'un client
	console.log("Client connected : "+socket.name);
	socket.write("File to send: ".cyan.bold+"(To give a file name: fileName=XX)".cyan.italic);
	
	//Gestion des données recues
	socket.on('data',function(data){
		//En cas de definiton d'un fileName: on renomme le fileName de la socket et on demande le fichier à l'utilisateur
		if(data.indexOf("fileName=")==0){
			socket.fileName=data.substring(9);
			console.log("File name changed to "+socket.fileName);
			socket.write("File: ".cyan.bold);
		}
		else{
			var writer = fs.createWriteStream(socket.fileName);
			writer.write(data); //Ajout des données dans le fichier
			socket.write("\nFile to send: ".cyan.bold+"(To give a file name: fileName=XX)".cyan.italic);
		}
	})
});

server.listen(8124, function() { 
  	console.log('server bound');
});