const express = require('express')
const bodyParser = require('body-parser')
const { ObjectID } = require('mongodb')

var {mongoose} = require('./db/mongoose');
var {Todo} = require("./models/todos")
var {user} = require("./models/users")

const port = process.env.PORT || 3000 

var app=express();
app.use(bodyParser.json());

app.post('/todos' , (req, res)=>{
    console.log(req.body)

    var todo = new Todo({
        text : req.body.text,

    })

    todo.save().then((doc )=>{
        res.send(doc)
    }, (e)=>{
        res.status(400).send(e)
    })
})

app.get('/todos', (req, res)=>{

    Todo.find().then((todos)=>{
        res.send({todos});
    },(e)=>{
        res.status(400).send(e);
    })

})

app.get('/todos/:id',(req,res)=>{
    //res.send(req.params);
    var id= req.params.id
     
    if(!ObjectID.isValid(id)){
        res.status(404).send() 
    }else{
        Todo.findById(id).then((todo)=>{
            if(!todo){
                res.status(404).send()
            }else{
                res.send({todo})
            }
        }, (e)=>{
            res.status(400).send({})
        })
    }
})

app.listen(3000, ()=>{
    console.log(`Started server on port  ${port} `)
})

module.exports = {app}