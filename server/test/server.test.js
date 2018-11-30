const expect = require('expect')
const request =require('supertest');
const { ObjectID } = require('mongodb')


const {app } =require('./../server');
const {Todo} =require('./../models/todos')

const todos = [
    {
        _id : new ObjectID(),
        text: "First test todo"
    } , {
        _id : new ObjectID(),
        text: "Second test todo",
        completed: true,
        completedAt : 1200383
    }
]

beforeEach((done)=>{
    Todo.remove({}).then(()=>{
        return Todo.insertMany(todos)
    }).then(()=> done())
})

describe('Post /todos', ()=>{
    it('should create new todo' , (done)=>{
        var text = "Test to be tested"

        request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res)=>{
            expect(res.body.text).toBe(text)
        })
        .end((err, res)=>{
            if(err){
                return done(err)
            }

            Todo.find({text}).then((todos)=>{
                expect(todos.length).toBe(1)
                expect(todos[0].text).toBe(text);
                done()
            }).catch((e)=>done(e))
        })
    })

    it('should not create todo with invalid body data', (done)=>{
        
        request(app)
            .post('/todos')
            .expect(400)
            .end((err , res) =>{
                if(err){
                    return done(err)
                }
                Todo.find().then((todos)=>{
                    expect(todos.length).toBe(2)
                    done()
                }).catch((e)=>done(e))
            })
    })
})

describe('GET /todos', ()=>{
    it('should get all todos' , (done)=>{
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res)=>{
            expect(res.body.todos.length).toBe(2)
        })
        .end(done);
    })
})

describe('GET /todos/:id',()=>{
    it('should return todo doc' ,(done)=>{
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo.text).toBe(todos[0].text)
        })
        .end(done)
    })
    it('should return 404 if Todo is not found',(done)=>{

        var new_oid=new ObjectID()
        request(app)
        .get(`/todos/${new_oid.toHexString()}`)
        .expect(404)
        .end(done)

    })
    it('should return 404 for non-object IDs',(done)=>{

        request(app)
        .get(`/todos/123`)
        .expect(404)
        .end(done)

    })
})

describe("DELETE /todos/:id",()=>{
    it('should remove a Todo', (done)=>{
        var hexID = todos[1]._id.toHexString()

        request(app)
        .delete(`/todos/${hexID}`)
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo._id).toBe(hexID)
        })
        .end((err, res) =>{
            if (err){
                return done(err)
            }
            Todo.findById(hexID).then((todo)=>{
                expect(todo).toNotExist()
                done()
            }).catch((e)=>{
                console.log(e)
            })
        })
    })
    it('should return 404 if todo is not found', (done)=>{
        var new_oid=new ObjectID()
        request(app)
        .delete(`/todos/${new_oid.toHexString()}`)
        .expect(404)
        .end(done)
    })
    it('should return 404 if todo ObjectID is invalid', (done)=>{
        request(app)
        .delete(`/todos/123`)
        .expect(404)
        .end(done)

    })
})

describe('PATCH /todos/:id', ()=>{
    it('should update the todo',(done)=>{
        var hexID=todos[0]._id.toHexString()
        var updated_text = 'First test case updated'

        request(app)
        .patch(`/todos/${hexID}`)
        .send({text:updated_text, completed:true})
        .expect(200)
        .expect( (res)=>{
            //console.log(res)
            expect(res.body.todo.text).toBe(updated_text)
            expect(res.body.todo.completedAt).toBeA('number')
            expect(res.body.todo.completed).toBe(true)
        } )
        .end(done)


    })

    it('should clear completedAt when Todo is not completed',(done)=>{
        var hexID=todos[1]._id.toHexString()
        var updated_text='Second test case updated'

        request(app)
        .patch(`/todos/${hexID}`)
        .send({text:updated_text , completed:false})
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo.text).toBe(updated_text)
            expect(res.body.todo.completed).toBe(false)
            expect(res.body.todo.completedAt).toNotExist()
        })
        .end(done)

    })
})