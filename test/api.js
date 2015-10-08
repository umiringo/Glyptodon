var assert = require('assert'),
	request = require('supertest'),
	should = require('should'),
	config = require('../config'),
	app = require('../app'),
	errCode = require('../const').errCode;

describe('API', function() {
	var server;
	url = 'http://127.0.0.1:8878';

	before(function() {
		app.createServer();
	});
	after(function() {

	});

	describe('#/ping', function() {
		it('should return server time(serverTime)', function(done) {
			request(url).get('/ping').set('Accept', 'application/json')
			.end(function(err, res) {
				if(err) return done(err);
				var result = JSON.parse(res.text);
				result.should.have.property('serverTime');
				done();
			});
		});
	});

	describe('#/requestchallenge', function() {
		it('fail case: invalid param',function(done){
			request(url).get('/requestchallenge')
			.end(function(err, res) {
				if(err) return done(err);
				//res.should.have.status(400); TODO
				var result = JSON.parse(res.text);
				result.should.have.property('result', errCode.ValidatorErr)
				done();
			});
		});
		it('fail case: version wrong', function(done){
			request(url).get('/requestchallenge?version=0.0.0')
			.end(function(err,res) {
				if(err) return done(err);
				//status check TODO 
				var result = JSON.parse(res.text);
				result.should.have.property('result', errCode.VersionErr);
				done();
			});
		});
		it('should return challenge code', function(done){
			request(url).get('/requestchallenge?version=' + config.net.version)
			.end(function(err, res){
				if(err) return done(err);
				//status check TODO
				var result = JSON.parse(res.text);
				result.should.have.property('result', errCode.Success);
				result.should.have.property('challenge');
				done();
			});
		});
	});
});
