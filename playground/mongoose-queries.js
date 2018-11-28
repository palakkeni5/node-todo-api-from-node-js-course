const {ObjectID} =require('mongodb');
const {mongoose} = require('./../server/db/mongoose')
const {Todo} = require('./../server/models/todos')
const { user } =require('./../server/models/users')

var id= '5bfe5d8639417b076440f5fe';

if(! ObjectID.isValid(id)){
    console.log('ID not valid')
}

// Todo.find({
//     _id : id
// }).then((todos)=>{
//     console.log('Todos',todos);
// })

// Todo.findOne({
//     _id : id
// }).then((todo)=>{
//     console.log('Todos',todo);
// })

Todo.findById(id).then((todo)=>{
    if(!todo){
        return console.log('ID not found')
    }

    console.log('Todo By ID', todo);
}).catch((e)=> console.log(e))

var uid = "5bfd0422f261081730773f19"

user.findById(uid).then((user)=>{
    if(!user){
        return console.log('User ID not found')
    }
    console.log('User By ID ', user)
}).catch((e)=>{console.log(e)})