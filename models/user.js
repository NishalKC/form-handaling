const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/user')

const userSchema =mongoose.Schema({
    name:String,
    email: String,
    password: String,
})
module.exports = mongoose.model('User',userSchema)