var util = require('util');
var net = require('net');
var fs = require('fs');
require("./styles.js").add_theme();

//Connexion du client au serveur
var client = net.connect({port: 8124},
    	function() { //'connect' listener
	console.log('\tWelcome to the server !'.magenta.bold);
	console.log("You are connected\n".blue.bold);
});

process.stdin.setEncoding('utf8');

//Gestion des entrées du client
process.stdin.on('data', function(data) {
	var fichier = data.toString().trim();
	
	//Envoie du nom du fichier en cas d'utilisation du fileName
	if(fichier.indexOf("fileName=")==0 && fichier.length>9){
		//console.log("Changing file name to "+fichier.substring(9));
		client.write(fichier+".txt");
	}
	else{
		//Test de l'existe du nom de fichier donné
		fs.exists(fichier, function(exists) {
			if(exists){
				//Création, lecture et envoie du fichier
				var readstream = fs.createReadStream(fichier);
				readstream.pipe(client, {end:false});
				util.log("File send !".green);
			}
			else{
				console.log("The file ".red+fichier+" doesn't exist".red);
				console.log("\nFile to send: ".cyan.bold+"(To give a file name: fileName=XX)".cyan.italic);
			}
		});
	}
});

//Affichage des messages envoyés par le serveur
client.on('data', function(data) {
	console.log(data.toString());
});

//Gestion de la déconnection
client.on("end", function(){
	console.log("Disconnected");
});