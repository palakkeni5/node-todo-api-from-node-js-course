// const MongoClient = require('mongodb').MongoClient;
const {MongoClient , ObjectID} = require('mongodb'); 

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true } ,(err, client)=>{
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }

    console.log('Connected to the MongoDB server');

    const db= client.db('TodoApp')

    db.collection('Todos').insertOne({
        text:'Myself Living in Mumbai , India',
        completed : false
    },(err, result)=>{
        if(err){
            console.log('Unable to insert Todos',err);
        }else{
            console.log(JSON.stringify(result.ops, undefined , 2));
        }
    })
    // db.collection('Users').insertOne({
    //     name:'Palak Keni',
    //     age: 20,
    //     location:'Mumbai,India'
    // },(err, result)=>{
    //     if(err){
    //         console.log('Unable to insert Users', err);
    //     }else{
    //         console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined , 2));
    //     }
    // })

    client.close();
})