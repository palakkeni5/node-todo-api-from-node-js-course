// const MongoClient = require('mongodb').MongoClient;
const {MongoClient , ObjectID} = require('mongodb'); 

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true } ,(err, client)=>{
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }

    console.log('Connected to the MongoDB server');

    const db= client.db('TodoApp')


    // db.collection('Todos').findOneAndUpdate(
    //     {_id : new ObjectID('5ba13114ad3fcc19141a5551')},
    //     {$set : {
    //         completed : true
    //     }}, 
    //     {
    //         returnOriginal : false
    //     }
    // ).then((res)=>{
    //     console.log(res)
    // })
    db.collection('Users').findOneAndUpdate({
            name:"Palak Keni"
        },{
            $set : {
             name:"Nayan Keni"
            },
            $inc : {
                age : 5
            }
        }, {
            returnOriginal : false
        }
    ).then((res)=>{
        console.log(res)
    })


    client.close();
})