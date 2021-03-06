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
	comments: Array,
	notDecidedList:Array,
	acceptList: Array,
	declineList: Array
})

var Event = module.exports = mongoose.model('event',eventSchema);

module.exports.getEvents = function(callback){
      Event.find(callback);
}

module.exports.getEventEmails = function(callback){
      Event.find({"class":1,_id:0},callback);
}

module.exports.addEvent = function(newEvent,callback){
      Event.create(newEvent,callback);
}

module.exports.updateEvent = function(id,newEvent,callback){
	console.log("I'm in updateEvent in model.js");
	console.log("id: "+id);
	console.log("newEvent: " + newEvent);
      Event.findByIdAndUpdate(id,newEvent,callback);
}

module.exports.deleteEvent = function(id,callback){
      Event.findByIdAndRemove(id,callback);
}
module.exports.getEvent = function(id,callback){
      Event.findById(id,callback);
}

module.exports.partialUpdateEvent = function(id,newItem){
	console.log("I'm in partialUpdateEvent in model.js");
	console.log("id: "+id);
	console.log("newEvent: " + newItem);
	Event.findOneAndUpdate({_id: id}, {$set:{infotext: "test3"}}, {new:true}, function(err,events){}
);
}
