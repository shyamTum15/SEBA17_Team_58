var express = require('express');
var cors = require('cors');
var router = express.Router();
var Event = require('../models/model');
var User = require('../models/modelUser');
var nodemailer = require('nodemailer');

router.get('/',cors(),function(req,res){
     Event.getEvents(function(err,events){
     	if(err) throw err;
     	res.json(events);
     });
})

router.get('/eventEmails',cors(),function(req,res){
     console.log("I am in eventEmails function");
     Event.getEventEmails(function(err,events){
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
        comments: req.body.comments,
        inviteList:req.body.inviteList,
        acceptList: req.body.acceptList,
        declineList: req.body.declineList
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
        comments: req.body.comments,
        inviteList:req.body.inviteList,
        acceptList: req.body.acceptList,
        declineList: req.body.declineList
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

router.post('/sendmail/:parentEmail/:userEmail/:modelId',function(req,res){

console.log("I am in backend post send mail function req.params.userEmail ",req.params.userEmail);
console.log("I am in backend post send mail function req.body.userEmail ",req.body.userEmail);
console.log("I am in backend post send mail function req.params.parentEmail ",req.params.parentEmail);
console.log("I am in backend post send mail function req.body.parentEmail ",req.body.parentEmail);
console.log("I am in backend post send mail function req.params.modelId ",req.params.modelId);
let transporter = nodemailer.createTransport({
    // host: 'smtp.example.com',
    port: 465,
    service: 'Gmail',
    secure: true,
    auth: {
        user: 'schooleventappseba2017@gmail.com',
        pass: 'Seba@2017'
    },
    tls: {
     rejectUnauthorized: false
    }
});

 let mailerOptions = {
     from : "SchoolEventAppSeba2017@gmail.com",
     to: req.params.parentEmail,
     subject: "Notification for new Event",
     text: "Please find the newly created event in our School Event Management Application where your child is being considered. Please login to our application and send your response. The Event Id: "+req.params.modelId+". Our application address: http://localhost:4200"
 };

transporter.sendMail(mailerOptions,(error,info)=>{
      if(error){
          return console.log(error);
      }
      console.log("The message is delivered");
      console.log("info");
      res.sendStatus(200);
});

// mail({
//     from: "debsarkar_ec@yahoo.com", // sender address
//     to: "shyam8799@gmail.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world ✔", // plaintext body
//     html: "<b>Hello world ✔</b>" // html body
// });

})

module.exports = router;
