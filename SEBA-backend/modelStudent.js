var mongoose = require('mongoose');

var studentSchema = new mongoose.Schema({
	name: String,
	class: String,
	parentemail: String,
	address: String
})

var Student = module.exports = mongoose.model('student',studentSchema);

module.exports.getStudentsByClass = function(clss,callback){
	  console.log("within model class: ",clss);
      Student.find( { "class":clss },callback );
}

module.exports.getStudentsByEmail = function (email,callback){
	console.log("email received to check if matched ",email);
    Student.find( { "parentemail":email },{"class":1,_id:0},callback );
}