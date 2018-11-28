var mongoose = require('mongoose')

mongoose.Promise=global.Promise

let db = {
  localhost: 'mongodb://localhost:27017/TodoApp',
  mlab: 'mongodb://palakkeni5:palakkeni5@ds119304.mlab.com:19304/node-todo-api-for-node-js-course'
};
mongoose.connect( process.env.PORT ? db.mlab : db.localhost,{ useNewUrlParser: true })
//mongoose.connect("mongodb://localhost:27017/TodoApp",{ useNewUrlParser: true })

module.exports = {mongoose}