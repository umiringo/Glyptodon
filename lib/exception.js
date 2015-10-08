var logger = require('./logger'),
	util = require('util'),
	errCode = require('../const').errCode;

function errHandler(error, res, msg){
	logger.error(error);
	res.status(400).send(msg);
}

function validatorHandler(error, res) {
	var msg = {
		result: errCode.ValidatorErr
	};
	logger.error(util.inspect(error));
	res.status(400).send(msg);
}

exports.errHandler = errHandler;
exports.validatorHandler = validatorHandler;