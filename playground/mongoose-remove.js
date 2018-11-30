const {ObjectID} =require('mongodb');
const {mongoose} = require('./../server/db/mongoose')
const {Todo} = require('./../server/models/todos')
const { user } =require('./../server/models/users')

// Todo.remove({ }).then((result)=>{
//     console.log(result)
// })

//Todo.findOneAndRemove()

// Todo.findByIdAndRemove()

Todo.findByIdAndRemove('5bfe7682e628042ef436a9dd').then((todos)=>{
    console.log(todos)
})