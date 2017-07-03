var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('./modelUser');

router.get('/',function(req,res){
     User.getUsers(function(err,users){
          if(err) throw err;
          res.json(users);
     });
})

router.post('/',function(req,res){
     console.log("I am in register get ",req);
     var newUser = {
         name: req.body.name,
         role: req.body.role,
         email: req.body.email,
         password: req.body.password,
         address: req.body.address
     }
     if (newUser.name !=null && newUser.role !=null && newUser.email !=null && newUser.password != null && newUser.address != null && newUser.name.length<11 && newUser.role.length<11 && newUser.password.length>3 && newUser.address.length>4 && newUser.address.length<21 && newUser.password==req.body.password1){
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

// passport.use(new LocalStrategy(
//   function(email, password, done) {
//     console.log("I am in passport + email",req.body.email);
//     User.getUserByEmail(email, function(err,user){
//        if(err) throw err;
//        if (!user){
//         return done(null, false,{message:'Unknown user'});
//        }
//        User.comparePassword(password,user.password,function(err,isMatch){
//         if (err) throw err;
//         if(isMatch){
//           return done(null,user);
//         }else{
//           return done (null,false,{message: "Invalid Password"});
//         }
//        })
//     });
//   }
// ))

// router.use(function(ctx, next) {
//   ctx.flash = function(type, msg) {
//     ctx.session.flash = { type: type, message: msg };
//   }

//   // return next();
// })

// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// })

// passport.deserializeUser(function(id, done) {
//   User.getUserById(id, function(err, user) {
//     done(err, user);
//   });
// })

router.post('/login',
  // passport.authenticate('local',{successRedirect:'/', failureRedirect:'/login',failureFlash: true}),
  function(req, res) {
    console.log("I am in post call + req: ",req.body.email);
    var user;
    User.getUserByEmail(req.body.email, function(err,user){
       if(err) throw err;
       if (!user){
        // return done(null, false,{message:'Unknown user'});
       console.log("null user fetched ",user);
       res.json(user);
       // res.json(user);
       }else{
       console.log ("user fetched ",user);
       User.comparePassword(req.body.password,user.password,function(err,isMatch){
        if (err) {
          user =null;
          console.log(err);}
          console.log("isMatch within compare function ",isMatch);
          console.log("user.password within compare function ",user.password);
          console.log("req.body.password within compare function ",req.body.password);
        if(isMatch==false){
          user=null;
          res.json(user);
        }
        else{
          res.json(user);
        }
        console.log("final user from backend ",user);
       });
       }
    });

    // res.redirect('/');
  })

// router.get('/login',function(req,res){
//      console.log("I am in route ",req.params.email);
//      User.getUserByEmail(req.params.email,function(err,users){
//           if(err) throw err;
//           res.json(users);
//      });
// })

router.get('/logout', function(req, res){
  // req.logout();
  console.log("got log out call from front end");
  // req.flash('success_msg', 'You are logged out');

  res.json(null);
});


router.put('/:_id',function(req,res){
     var updateUser = {
         name: req.body.name,
         role: req.body.role,
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
