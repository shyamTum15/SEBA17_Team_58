var express = require('express');
var router = express.Router();
var User = require('./modelUser');

router.get('/',function(req,res){
     User.getUsers(function(err,users){
          if(err) throw err;
          res.json(users);
     });
})

router.post('/',function(req,res){
     var newUser = {
         name: req.body.name,
         description: req.body.description,
         email: req.body.email,
         password: req.body.password,
         address: req.body.address
     }
     if (newUser.name !=null && newUser.description !=null && newUser.email !=null && newUser.password != null && newUser.address != null && newUser.name.length<11 && newUser.description.length<11 && newUser.password.length>3 && newUser.address.length>4 && newUser.address.length<21 && newUser.password==req.body.password1){
          User.addUser(newUser,function(err,users){
              if(err) throw err;
              console.log("req.body.password1",req.body.password1);
              res.json(users);
            });
     }
     else{
        console.log("error in data given");
     }

})

router.put('/:_id',function(req,res){
     var updateUser = {
         name: req.body.name,
         description: req.body.description,
         email: req.body.email,
         password: req.body.password,
         address: req.body.address
     }
     User.updateUser(req.params._id,updateUser,function(err,users){
          if(err) throw err;
          res.json(users);
     });
})

router.delete('/:_id',function(req,res){
     User.deleteUser(req.params._id, function(err,users){
          if(err) throw err;
          res.json(users);
     });
})

router.get('/:_id',function(req,res){
     User.getUser(req.params._id, function(err,users){
          if(err) throw err;
          res.json(users);
     });
})
module.exports = router;
