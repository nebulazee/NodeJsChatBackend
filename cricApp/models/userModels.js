var mongoose=require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017')
var schema=mongoose.Schema;

module.exports=mongoose.model('User',new schema({
    username:String,
    password:String
}));