var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
var _ = require('lodash');

var {mongoose} = require('./db/mongoose');
var {Todo}  = require('./models/todo');
var {User}  = require('./models/user');
var {authenticate}  = require('./middleware/authenticate');

var app = express();

app.use(bodyParser.json());

app.post('/todos',authenticate,(req,res) => {
	var todo = new Todo({
		text : req.body.text,
		_creator : req.user._id
	});

	todo.save().then((docs) => {
		res.send(docs);
	}, (e) => {
		res.status(400).send(e);
	})
});

app.get('/todos',authenticate,(req,res) => {
	Todo.find({_creator: req.user._id}).then((docs) =>{
		res.send({docs});
	},(e) => {
		res.status(400).send(e);
	})
});

app.get('/todos/:id',authenticate, (req,res) => {
	var id = req.params.id;
	if(ObjectID.isValid(id)){
      console.log(true); 
	}else{
		return res.status(404).send();
	};
	Todo.findOne({
		_id : id,
		_creator : req.user._id
	}).then((todos)=>{
		if(!todos){
			return res.status(404).send();
		}
		res.send({todos});
	}).catch((e)=>{
		res.status(400).send();
	});
});

app.delete('/todos/:id',authenticate ,async (req,res) => {
	const id = req.params.id;
	if(!ObjectID.isValid(id)){
		return res.status(404).send();
	}
	try {
    const todos = await Todo.findOneAndRemove({
              _id : id,
              _creator : req.user._id
	});
	if(!todos){
			return res.status(404).send();
		}
		res.send(todos);
	} catch (e){
		res.status(400).send();
	}
});

app.patch('/todos/:id',authenticate ,(req,res) => {
	var id = req.params.id;
	var body = _.pick(req.body,['text','completed']);

	if(!ObjectID.isValid(id)){
		return res.status(404).send();
	}

    if(body.completed && _.isBoolean(body.completed)){
    	body.completedAt = new Date().getTime();
    } else{
    	body.completedAt = null;
    	body.completed = false;
    }

	Todo.findOneAndUpdate( {_id:id , _creator : req.user._id} , {$set: body} , {new: true}).then((todos) => {
		if(!todos){
			return res.status(404).send();
		}
		res.send(todos);
	}).catch((e) => res.status(400).send());
	});


app.get('/users/me', authenticate, (req,res) => {
    return res.send(req.user);
});

app.post('/users', async (req,res) => {
    const body = _.pick(req.body,['email','password']);
    const user = new User(body);
    
    try {
    	await user.save();
        const token = await user.generateAuthToken();
        res.header('x-auth',token).send(user);
    } catch (e) {
    	res.status(400).send(e);
    }

});

app.post('/users/login', async (req,res) => {
	try {
		const body = _.pick(req.body, ['email','password']);
        const user = await User.findByCredentials(body.email,body.password);
        const token = await user.generateAuthToken();
        res.header('x-auth',token).send(user);
	} catch (e) {
		res.status(400).send();
	}
});

app.delete('/users/me/token', authenticate,async (req,res) => {
	try {
	 await req.user.removeToken(req.token);
		res.status(200).send();
	} catch(e) {
		res.status(400).send();
	}
});
    


app.listen(3000, () => {
	console.log('Starting the server on port 3000');
});




