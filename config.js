//net
var net = {
	port : 8878,
	salt : 'Sz6MwPzxSNjzHcRbC85y2a1OtJHx7GAJ',
	version : '1.0.0'
};

//mongodb
var mongodb = {
	path : 'mongodb://localhost/glyptodon'
};

//log
var log = {
	debug : './log/debug.log',
	verbose : './log/verbose.log',
	info : './log/info.log',
	error : './log/error.log',
	warn : './log/warn.log'
};

exports.net = net;
exports.mongodb = mongodb;
exports.log = log;