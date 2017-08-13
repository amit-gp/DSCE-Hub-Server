const express = require('express');
const CollegeNotification = require('../models/collegeNotificationModel');
const Book = require('../models/bookModel')
const User = require('../models/UserModel');
const router = express.Router();

//----------FOR TESTING ONLY----------------------------
router.get('/amit', function(req, res, next) {
     res.send({Name: "Amit in routes"});
});
//----------FOR TESTING ONLY----------------------------

router.post('/book', function(req, res, next) {

    Book.create(req.body).then(function(book) {
          res.send(book);
    }).catch(next);
});

router.post('/user', function(req, res, next) {

     User.findOne({Email: req.body.Email}, function(err, user) {
          if(user){
               res.send({Login: "Unsuccessful"});
          }
          else {
               User.create(req.body).then(function(user) {
                    res.send(user);
               }).catch(next);
          }
     });
});

router.post('/userLogin', function(req, res, next) {

     var email = req.body.Email;
     User.findOne({Email: req.body.Email, Password: req.body.Password}, function(err, user) {
          if(user){
               res.send(user);
          }
          else {
               res.send({Login: "Unsuccessful"});
          }
     });
});

router.get('/book', function(req, res, next) {

  /*----------TODO--------------------------

    ----Implement query parameters and searching based on queries
    ----Implement duplicate books

  ----------TODO--------------------------*/

    Book.find({}, function(err, docs) {
          console.log(req.query);
          res.send(docs);
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
