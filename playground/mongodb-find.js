const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',(error , db) => {
 if (error){
  return console.log('Unable to connect to MongoDB')
 }
 console.log('Connected!');

 db.collection('Todos').find({_id : new ObjectID("5b90f9c6524c091ca4452899") }).toArray().then((docs) => {
 	console.log(JSON.stringify(docs,undefined,2));
 }, (error) => {
 	console.log('Unable to fetch todos',error);
 });

 db.collection('Todos').find().count().then((count) => {
 	console.log(count);
 }, (error) => {
 	console.log('Unable to fetch todos',error);
 }); 
 
  
 //db.close();
});