var util = require('util');
var net = require('net');
var fs = require('fs');



var client = net.connect({port: 8124},
    	function() { //'connect' listener
  	console.log('client connected');
});

process.stdin.setEncoding('utf8');
console.log("Fichier a envoyer: ");
process.stdin.on('data', function(data) {
	var fichier = data.toString().trim();
	if(fichier.indexOf("fileName=")==0 && fichier.length>9){
		console.log("Changing file name to "+fichier.substring(9));
		client.write(fichier);
	}
	else{
		fs.exists(fichier, function(exists) {
			if(exists){
				var readstream = fs.createReadStream(fichier);
				readstream.pipe(client, {end:false});
				/*readstream.on("data", function(data){
					client.write(data);
				});*/
			}
			else console.log("Le fichier "+fichier+" n'existe pas");
		});
	}
});
client.on("end", function(){
	console.log("Disconnected");
});