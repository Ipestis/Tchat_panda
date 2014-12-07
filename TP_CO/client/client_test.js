var util = require('util');
var net = require('net');
var fs = require('fs');

process.stdin.setEncoding('utf8');

process.stdin.on('data', function(data) {
	var fichier = data.toString().trim();
	
	fs.exists(fichier, function(exists) {
		if(exists){
			fs.readFile(fichier, function(err, data) {
				client.write(data.toString());
			});
		}
		else console.log("Le fichier "+fichier+" n'existe pas");
	});
	/*
	if (fichier !== null) {
		client.write(fichier);
	}*/
});

process.stdin.on('end', function() {
	process.stdout.write('end');
});

var client = net.connect({port: 8124},
    	function() { //'connect' listener
  	console.log('client connected');
});

client.on('data', function(data) {
	util.log(">>"+data.toString());
});

client.on('end', function() {
	console.log('client disconnected');
});
