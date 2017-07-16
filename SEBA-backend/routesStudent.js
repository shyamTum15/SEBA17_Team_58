var express = require('express');
var router = express.Router();
var Event = require('./model');
var User = require('./modelUser');
var Student = require('./modelStudent');

router.get('/',function(req,res){
     Event.getEvents(function(err,events){
      if(err) throw err;
      res.json(events);
     });
})

router.get('/:class',function(req,res){
     Student.getStudentsByClass(req.params.class, function(err,students){
      if(err) throw err;
      console.log("fetched student from backend ",students);
      res.json(students);
     });
})

router.get('/byEmail/:email',function(req,res){
  console.log("received email in backend ",req.params.email);
  Student.getStudentsByEmail(req.params.email,function(err,students){
    if(err) throw err;
    console.log("fetched Student from backend based on parent email ",students);
    res.json(students);
  });
})

router.post('/',function(req,res){
     console.log("I am in routesStudent post");
     var newStudent = {
         name: req.body.name,
         class: req.body.class,
         address: req.body.address,
         parentemail: req.body.parentemail
     }
     Student.addStudent(newStudent);
})

// router.post('/',function(req,res){
//   var newEvent = {
//     name: req.body.name,
//       description: req.body.description,
//       class: req.body.class,
//       teacher: req.body.teacher,
//       infotext: req.body.infotext,
//       status: req.body.status,
//       cost: req.body.cost,
//       packing: req.body.packing,
//       schedule: req.body.schedule
//   }
//      Event.addEvent(newEvent,function(err,events){
//       if(err) throw err;
//       res.json(events);
//      });
// })

// router.put('/:_id',function(req,res){
//   var updateVal = {
//     name: req.body.name,
//       description: req.body.description,
//       class: req.body.class,
//       teacher: req.body.teacher,
//       infotext: req.body.infotext,
//       status: req.body.status,
//       cost: req.body.cost,
//       packing: req.body.packing,
//       schedule: req.body.schedule
//   }
//      Event.updateEvent(req.params._id,updateVal,function(err,events){
//       if(err) throw err;
//       res.json(events);
//      });
// })

// router.delete('/:_id',function(req,res){
//      Event.deleteEvent(req.params._id, function(err,events){
//       if(err) throw err;
//       res.json(events);
//      });
// })

// router.get('/:_id',function(req,res){
//      Event.getEvent(req.params._id, function(err,events){
//       if(err) throw err;
//       res.json(events);
//      });
// })
module.exports = router;
