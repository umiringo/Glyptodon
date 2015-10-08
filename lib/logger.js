var winston = require('winston'),
	config = require('../config');

var info = new winston.Logger({
	levels: {
		info: 1
	},
	transports: [
		new (winston.transports.File)({
			filename: config.log.info,
			level: 'info'
		}),
	]
});

var debug = new winston.Logger({
	levels: {
		debug: 2,
	},
	transports: [
		new (winston.transports.File)({
			filename: config.log.debug,
			level: 'debug'
		}),
	]
});

var error = new winston.Logger({
	levels: {
		error: 3,
	},
	transports: [
		new (winston.transports.File)({
			filename: config.log.error,
			level: 'error'
		}),
	]
});

var verbose = new winston.Logger({
	levels: {
		verbose: 4,
	},
	transports: [
		new (winston.transports.File)({
			filename: config.log.verbose,
			level: 'verbose'
		}),
	]
});

var warn = new winston.Logger({
	levels: {
		warn: 5,
	},
	transports: [
		new (winston.transports.File)({
			filename: config.log.warn,
			level: 'warn'
		}),
	]
});

var exports = {
	info: function(msg){
		info.info(msg);
	},
	debug: function(msg){
		debug.debug(msg);
	},
	error: function(msg){
		error.error(msg);
	},
	verbose: function(msg){
		verbose.verbose(msg);
	},
	warn: function(msg){
		warn.warn(msg);
	},
};

module.exports = exports;