var uuid = require('node-uuid'),
	config = require('../config'),
	crypto = require('crypto'),
	logger = require('./logger'),
	errCode = require('../const').errCode;

function createChallenge(callback){

	callback({
		challengeCode: uuid.v4()
	});
}

function verifyChallengeResponse(params, callback) {
	var sha1 = crypto.createHash('sha1'),
		challenge = params.challenge,
		response = params.response,
		salt = config.net.salt;

	sha1.update(challenge + salt);
	var d = sha1.digest('base64');
	
	logger.debug('d : ' + d + "; response: " + response);

	if(d !== response){
		callback(errCode.VerifyErr);
	}
}

exports.createChallenge = createChallenge;
exports.verifyChallengeResponse = verifyChallengeResponse;