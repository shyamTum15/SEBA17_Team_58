var mongoose = require('mongoose');

var studentSchema = new mongoose.Schema({
	name: String,
	class: String,
	parentemail: String,
	address: String
})