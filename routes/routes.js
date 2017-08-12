const express = require('express');
const CollegeNotification = require('../models/collegeNotificationModel');
const User = require('../models/UserModel');
const router = express.Router();

//For testing purposes only !!!
router.get('/amit', function(req, res, next) {
     res.send({Name: "Amit in routes"});
});

router.post('/user', function(req, res, next) {

     User.create(req.body).then(function(user) {
          res.send(user);
     }).catch(next);
});

router.post('/userLogin', function(req, res, next) {

     var email = req.body.Email;
     User.findOne({Email: req.body.Email, Password: req.body.Password}, function(err, user) {
          if(user){
               res.send({Login: "Sucessful"});
          }
          else {
               res.send({Login: "Unsucessful"});
          }
     });
});

router.get('/collegeNotification', function(req, res, next) {
          CollegeNotification.find({messageLevel: "college"}, function(err, docs) {
          res.send(docs);
     });
});

//POST API IS STILL IN DEV MODE NOT FINAL !!!
router.post('/collegeNotification', function(req, res, next) {
     CollegeNotification.create(req.body).then(function(collegeNotification) {
          res.send(collegeNotification);
     }).catch(next);
});

module.exports = router;
