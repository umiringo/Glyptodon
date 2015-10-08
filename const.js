var errCode = {
	Success : {code : 200, msg: "Success"},
	VerifyErr : {code:4001, msg:'Verify failed'},
	DuplicateLoginErr : {code : 4002, msg:'Duplicate Login'},
	SignupErr : {code:4003, msg:'注册失败'},
	LoginErr : {code:4004, msg:'登陆失败'},
	SessionExpireErr : {code:4005, msg:"session过期"},
	VersionErr : {code:4006, msg:"版本错误"},
	ValidatorErr : {code:4007, msg:"参数错误"}
};

exports.errCode = errCode;