var mongoose = require('mongoose');
var eventSchema = new mongoose.Schema({
	name: String,
	description: String,
	class: String,
	teacher: String,
	infotext: String,
	status: Array,
	cost: Array,
	packing: Array,
	schedule: String,
	comments: Array
})

var Event = module.exports = mongoose.model('event',eventSchema);

module.exports.getEvents = function(callback){
      Event.find(callback);
}

module.exports.addEvent = function(newEvent,callback){
      Event.create(newEvent,callback);
}

module.exports.updateEvent = function(id,newEvent,callback){
      Event.findByIdAndUpdate(id,newEvent,callback);
}

module.exports.deleteEvent = function(id,callback){
      Event.findByIdAndRemove(id,callback);
}
module.exports.getEvent = function(id,callback){
      Event.findById(id,callback);
}
