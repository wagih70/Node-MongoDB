var {mongoose} = require('./../server/db/mongoose');
var {Todo}  = require('./../server/models/todo');
var {User}  = require('./../server/models/user');

var id = "5b9291093232aa1648e85a8d";

Todo.findById(id).then((todo) => {
	if(!todo){
		return console.log('wrong id');
	}
   console.log(todo);
}).catch((e)=> console.log(e));