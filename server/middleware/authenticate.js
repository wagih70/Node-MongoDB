const {User} = require('./../models/user')


var authenticate = (req,res,next) => {
    var token = req.header('x-auth');
    User.findTokenById(token).then((user) => {
    	if(!user){
    		return Promise.reject();
    	}
    	req.user = user;
    	req.token = token;
    	next();
    }).catch((e) => {
    	return res.status(401).send();
    });
}

module.exports = {
    authenticate
}