var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var salt = bcrypt.genSalt();
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
	console.log("got the user ",newUser);
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

/////Log in

module.exports.getUserByEmail = function(email,callback){
	var query = {email: email};
	User.findOne(query,callback);
}

module.exports.getUserById = function(id,callback){
	User.findById(id,callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, res) {
	   console.log("I am in bcrypt candidatePassword ",candidatePassword);
	   console.log("I am in bcrypt hash",hash);
	   callback(null, res);
  });

}