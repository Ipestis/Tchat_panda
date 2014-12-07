var util = require('util');
var net = require('net');

process.stdin.setEncoding('utf8');

process.stdin.on('readable', function() {
	var chunk = process.stdin.read();
	if (chunk !== null) {
		client.write(chunk);
	}
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
