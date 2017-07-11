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