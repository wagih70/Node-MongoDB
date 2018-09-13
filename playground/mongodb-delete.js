const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',(error , db) => {
 if (error){
  return console.log('Unable to connect to MongoDB')
 }
 console.log('Connected!');

 db.collection('Todos').findOneAndDelete({completed: false}).then((result)=> {
 	console.log(result)}); 

 	 db.collection('Todos').findOneAndDelete({_id : new ObjectID("5b914adf1b4f2b18d7798630")}).then((result)=> {
 	console.log(result)});  
 //db.close();
});