var net = require('net');
var fs = require('fs');
require("./styles.js").add_theme();
var clients = [];

//Création du serveur
var server = net.createServer(function(socket) {
	
	//Message à la déconnection
  	socket.on('end', function() {
		socket.writer.end();
    	console.log('Client disconnected');
  	});
	
	//Definition des paramètres des sockets
	socket.name = socket.remoteAddress+":"+socket.remotePort;
	socket.fileName="defaultFileName.txt";
	socket.writer =  fs.createWriteStream(socket.fileName);
		
	clients.push(socket);
	
	//Connexion d'un client
	console.log("Client connected : "+socket.name);
	socket.write("File to send: ".cyan.bold+"(Give a filename: fileName=XX.xx)".cyan.italic);
	
	//Gestion des données recues
	socket.on('data',function(data){
		//En cas de definiton d'un fileName: on renomme le fileName de la socket et on demande le fichier à l'utilisateur
		if(data.toString().indexOf("fileName=")==0){
			socket.fileName=data.toString().substring(9);
			socket.writer =  fs.createWriteStream(socket.fileName);
			console.log("File name changed to "+socket.fileName);
			socket.write("File: ".cyan.bold);
		}
		else{
			socket.writer.write(data); //Ajout des données dans le fichier par défaut
		}
	})
});

server.listen(8124, function() { 
  	console.log('server bound');
});