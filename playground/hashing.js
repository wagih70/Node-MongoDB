const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var data = {
	id : 'abc123'
}

// var token = jwt.sign (data,'secret');
// console.log(token);

// var decoded = jwt.verify(token,'secret');
// console.log(decoded);

var password = '123456!';

// bcrypt.genSalt(10,(error,salt) => {
// 	bcrypt.hash(password,salt, (error,hash) => {
// 		console.log(hash);
// 	})
// });

var hashedPassword = '$2a$10$0eMi0bZCY6slB3mt5cJ8wu4xdVOhcCzPFjw8MOkyRljrP/NEeMn8K';

bcrypt.compare(password,hashedPassword, (error,res) => {
	console.log(res);
})