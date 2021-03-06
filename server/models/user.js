var mongoose = require('mongoose');
var validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');


var UserSchema = new mongoose.Schema({
	email : {
		type : String,
		required : true,
		trim : true,
		minlength : 1,
		unique : true,
		validate : {
			validator : validator.isEmail,
			message : `{value} is not an email`
		}
	},
	password : {
		type : String,
		required : true,
		minlength : 6
	},
	tokens : [{
		access : {
			type : String,
			required : true
		},
        token : {
        	type : String,
        	required : true
        }
	}]
});

UserSchema.statics.findTokenById = function (token) {
	var User = this;
	var decoded;
	try{
    decoded = jwt.verify(token,'abc123');
	} catch (e){
		return Promise.reject();
	}
	return User.findOne({
		'_id' : decoded._id,
		'tokens.access' : 'auth',
		'tokens.token' : token
	})
}

UserSchema.methods.toJSON = function () {
	var user = this;
	var toObject = user.toObject();

	return _.pick(toObject,['_id','email']);
}


UserSchema.methods.generateAuthToken = function () {
	var user = this;
	var access = 'auth';
	var token = jwt.sign({_id: user._id.toHexString(),access},'abc123').toString();

	user.tokens.push({access,token});
	return user.save().then(() => {  // eb2a 7ott return bs e3raf leh elawel
		return token;    // return eluser fmara
	})
};

UserSchema.methods.removeToken = function (token) {
	var user = this;

	return user.update({
		         $pull : {
			        tokens : {
                       token : token
			        }
		         }
            });
}

UserSchema.pre('save', function (next) {
    var user = this;
    if(user.isModified('password')){
        bcrypt.genSalt(10,(error,salt) => {
    	bcrypt.hash(user.password,salt, (error,hash) => {
		  user.password = hash;
		  next();
	     });
    });
    }else{
    next();
    }
});

UserSchema.statics.findByCredentials = function (email,password) {
	var User = this;

	return User.findOne({email}).then((user)=>{
       if(!user){
         return Promise.reject();
       }
    return new Promise((resolve,reject)=> {
    bcrypt.compare(password,user.password, (error,res) => {
    	if(res){
    		resolve(user);
    	}else{
    		reject();
    	}
	})
    });    
    });
    };
       

var User = mongoose.model('User',UserSchema);

module.exports = {
	User
}