const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',(error , db) => {
 if (error){
  return console.log('Unable to connect to MongoDB')
 }
 console.log('Connected!');

db.collection('Todos').findOneAndUpdate(
    {_id : new ObjectID('5b9163011b4f2b18d7798636')},
    {$set : { completed : true}},
    {returnOriginal : false}
	).then((result) =>{
		console.log(result);
	});

 //db.close();
});