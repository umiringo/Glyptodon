var express = require('express'),
	router = express.Router(),
	config = require('../config'),
	logger = require('../lib/logger'),
	auth = require('../lib/auth'),
	exception = require('../lib/exception'),
	validator = require('express-validator'),
	errCode = require('../const').errCode;

router.route('/ping').get(function(req, res) {
	var now = new Date();
	res.json({
		serverTime: now.getTime()
	});
});

router.route('/requestchallenge').get(function(req,res) {
	req.checkQuery('version', 'Invalid version').notEmpty();
	var errors = req.validationErrors();
	if(errors){
		exception.validatorHandler(errors,res,msg);
		return;
	}

	if(req.query.version !== config.net.version){
		var msg = {
			result: errCode.VersionErr
		};
		var error = "version err; req.query.version = " + req.query.version
					+ "; config.net.version = " + config.net.version; 
		exception.errHandler(error, res, msg);
		return;
	} else {
		auth.createChallenge(function(value){
			res.json({
				result: errCode.Success,
				challenge: value.challengeCode
			});
			return;
		});
	}
});

module.exports = router;