// const MongoClient = require('mongodb').MongoClient;
const {MongoClient , ObjectID} = require('mongodb'); 

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true } ,(err, client)=>{
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }

    console.log('Connected to the MongoDB server');

    const db= client.db('TodoApp')

    // db.collection('Todos').find({completed : true}).toArray().then((docs)=>{
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined , 2));
    // },(err)=>{
    //     console.log('Unable to fetch todos',err)
    // })

    // db.collection('Todos').find({completed : true}).count().then((docs)=>{
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined , 2));
    // },(err)=>{
    //     console.log('Unable to fetch todos',err)
    // })

    db.collection('Users').find({name : "Pramod Keni"}).toArray().then((docs)=>{
        console.log(JSON.stringify(docs,undefined,4))
    }),(err)=>{
        console.log('Unable to fetch data', err)
    }


    client.close();
})