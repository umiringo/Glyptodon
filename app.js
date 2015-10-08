var express = require('express'),
	bodyParser = require('body-parser'),
	config = require('./config'),
	session = require('express-session'),
	api = require('./controller/api'),
	logger = require('./lib/logger'),
	validator = require('express-validator'),
	exception = require('./lib/exception'),
	auth = require('./lib/auth'),
	errCode = require('./const').errCode;


var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());

app.set('port', config.net.port);
app.set('trust proxy', 1);

//hooks

//verbose log
app.all('*', function(req, res, next) {
	logger.verbose('From: ' + req.ip + '; baseUrl: ' 
		+ req.baseUrl + '; originalUrl: ' 
		+ req.originalUrl + '; params: '
	);
	next();
});

app.all('/auth/*', function(req,res,next){
	req.checkbody('challenge', 'Invalid challenge').notEmpty();
	req.checkbody('response', 'Invalid response').notEmpty();
	var errors = req.validationErrors();
	if(errors){
		exception.validatorHandler(errors,res);
		return;
	}

	auth.verifyChallengeResponse({
		challenge: req.body.challenge,
		response: req.body.response
		}, function(err){
			if(err){
				var msg = {
				result: err
				};
				var  error = "Verify error; challenge : " + req.body.challenge
						+ "; response : " + req.body.response;
				exception.errHandler(error, res, msg);
				return;
			} else {
				next();
			}
	});
});

//route
app.use('/', api);

//server
var createServer = function() {
	var server = app.listen(app.get('port'), function() {
	});	
};


exports.createServer = createServer;