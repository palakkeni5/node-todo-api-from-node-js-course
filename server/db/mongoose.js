var mongoose = require('mongoose')

mongoose.Promise=global.Promise

let db = {
  localhost: 'mongodb://localhost:27017/TodoApp',
  mlab: 'mongodb://palak:abc123@ds119304.mlab.com:19304/node-todo-api-for-node-js-course'
};
mongoose.connect( db.localhost ||  db.mlab,{ useNewUrlParser: true });
//mongoose.connect("mongodb://localhost:27017/TodoApp",{ useNewUrlParser: true })

module.exports = {mongoose}