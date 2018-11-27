// const MongoClient = require('mongodb').MongoClient;
const {MongoClient , ObjectID} = require('mongodb'); 

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true } ,(err, client)=>{
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }

    console.log('Connected to the MongoDB server');

    const db= client.db('TodoApp')

    // db.collection('Todos').deleteMany({text : 'Get new train pass'}).then((result)=>{
    //     console.log(result)
    // })
    
    // db.collection('Todos').deleteOne({text : 'complete nodejs course'}).then((result)=>{
    //     console.log(result)
    // })

    // db.collection('Todos').findOneAndDelete({text : 'complete nodejs course'}).then((result)=>{
    //     console.log(result)
    // })

    // db.collection('Users').deleteMany({name: 'Palak Keni'}).then((result)=>{
    //     console.log(result)
    // })

    db.collection('Users').findOneAndDelete({ _id : new ObjectID('5bae60ffec01730b7c0fd0c0') }).then((result)=>{
        console.log(result)
    })

    client.close();
})