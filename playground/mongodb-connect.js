const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',(error , db) => {
 if (error){
  return console.log('Unable to connect to MongoDB')
 }
 console.log('Connected!');

 
  db.collection('Users').insertOne({
 	name : 'Mohamed',
 	age : 25,
 	location : 'philadelphia'
 },(error,result)=>{
 	if(error){
 	return console.log('Unable to insert User',error);
    }
    console.log(result.ops[0]._id.getTimestamp());
 });

 db.close();
});