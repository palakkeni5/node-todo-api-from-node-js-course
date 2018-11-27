var mongoose = require('mongoose')


var user =mongoose.model('Users', {
    email : {
        type: String,
        require: true,
        minlength : 1,
        trim : true
    }
})

module.exports = { user }