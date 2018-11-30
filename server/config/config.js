var env = process.env.NODE_ENV || 'development';

console.log('env *****', env);

if( env === 'development') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
} else if( env === 'test') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
} else if( env === 'production' ) {
  process.env.MONGODB_URI = 'mongodb://palakkeni5:palakkeni5@ds119304.mlab.com:19304/node-todo-api-for-node-js-course'
}