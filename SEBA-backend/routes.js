var express = require('express');
var cors = require('cors');
var router = express.Router();
var Event = require('./model');
var User = require('./modelUser');

router.get('/',cors(),function(req,res){
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
      packing: req.body.packing,
      schedule: req.body.schedule,
      comments: req.body.comments
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
      packing: req.body.packing,
      schedule: req.body.schedule,
      comments: req.body.comments
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

     router.patch('/:id', function(req, res) {
        var id = req.params.id;

        if(req.body.infotext != {}){
        var body = req.body.infotext
        console.log("I'm in router.patch");
        console.log("ID: " + id);
        console.log("Value: " + req.body.infotext);
        Event.findOneAndUpdate({_id: id}, {$set:{infotext: body}}, {new:true}, function(err,events){}
      ); }

      if(req.body.schedule != {}){
      var body = req.body.schedule
      console.log("I'm in router.patch");
      console.log("ID: " + id);
      console.log("Value: " + req.body.schedule);
      Event.findOneAndUpdate({_id: id}, {$set:{schedule: body}}, {new:true}, function(err,events){}
    ); }

    })

module.exports = router;
