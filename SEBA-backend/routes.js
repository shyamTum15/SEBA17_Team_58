var express = require('express');
var router = express.Router();
var Event = require('./model');
var User = require('./modelUser');

router.get('/',function(req,res){
     Event.getEvents(function(err,events){
     	if(err) throw err;
     	res.json(events);
     });
})

router.post('/',function(req,res){
	var newEvent = {
		name: req.body.name,
	    description: req.body.description,
	    class: req.body.class,
	    teacher: req.body.teacher,
      infotext: req.body.infotext,
      status: req.body.status,
      cost: req.body.cost,
      packing: req.body.packing
	}
     Event.addEvent(newEvent,function(err,events){
     	if(err) throw err;
     	res.json(events);
     });
})

router.put('/:_id',function(req,res){
	var updateVal = {
		name: req.body.name,
	    description: req.body.description,
	    class: req.body.class,
	    teacher: req.body.teacher,
      infotext: req.body.infotext,
      status: req.body.status,
      cost: req.body.cost,
      packing: req.body.packing
	}
     Event.updateEvent(req.params._id,updateVal,function(err,events){
     	if(err) throw err;
     	res.json(events);
     });
})

router.delete('/:_id',function(req,res){
     Event.deleteEvent(req.params._id, function(err,events){
     	if(err) throw err;
     	res.json(events);
     });
})

router.get('/:_id',function(req,res){
     Event.getEvent(req.params._id, function(err,events){
     	if(err) throw err;
     	res.json(events);
     });
})
module.exports = router;
