var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var userSchema = new mongoose.Schema({
	name: String,
	role: String,
	email: String,
	password: String,
	address: String
})

var User = module.exports = mongoose.model('user',userSchema);

module.exports.getUsers = function(callback){
      User.find(callback);
}

module.exports.addUser = function(newUser,callback){
	bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
        newUser.password = hash;
        User.create(newUser,callback);
    });
});
      // User.create(newUser,callback);
}

module.exports.updateUser = function(id,newUser,callback){
      User.findByIdAndUpdate(id,newUser,callback);
}

module.exports.deleteUser = function(id,callback){
      User.findByIdAndRemove(id,callback);
}
module.exports.getUser = function(id,callback){
      User.findById(id,callback);
}