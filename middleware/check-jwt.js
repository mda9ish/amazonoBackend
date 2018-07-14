const jwt= require('jsonwebtoken');
const config = require('../config');

module.exports = function(req, res, next) {
	let token=req.headers["authorization"];

	if(token){
		jwt.verify(token,config.secretKey, function(err, decoded){
			if(err){
				res.json({
					success:false,
					message:'failed to authenticate token'
				});
			}else{
				req.decoded=decoded;
				next();
			}
		});
	}else{
		res.status(403).json({
			success:false,
			message:'no token provide'
		});
	}
}