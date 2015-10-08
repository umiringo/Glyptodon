var app = require('./app'),
	config = require('./config'),
	mongoose = require('mongoose');

//db init
mongoose.connect(config.mongodb.path);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error : '));
db.once('open', function( callback ) {
	console.log('DB connected !');
});

//server init 
app.createServer();
console.log("Server listening on port " + config.net.port);