var express = require('express');
var router = express.Router();
var Event = require('../models/model');
var User = require('../models/modelUser');
var Student = require('../models/modelStudent');

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

module.exports = router;
