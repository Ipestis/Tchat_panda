//Récupération et copie de fichier avec vérification
var fs = require('fs');
process.stdin.setEncoding('utf8');

console.log("Fichier a envoyer: ");
process.stdin.on('data', function(data) {
	var fichier = data.toString().trim();

	fs.exists(fichier, function(exists) {
		if(exists){
			var readstream = fs.createReadStream(fichier);
			var writestream = fs.createWriteStream("fichier2.txt");
			readstream.pipe(writestream);

			fs.readFile("fichier2.txt", function(err, data) {
				console.log("Contenu du fichie: ");
				console.log(data.toString());
			});
		}
		else console.log("Le fichier "+fichier+" n'existe pas");
	});
});