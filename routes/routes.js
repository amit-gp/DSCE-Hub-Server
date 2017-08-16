const express = require('express');
const CollegeNotification = require('../models/collegeNotificationModel');
const Book = require('../models/bookModel')
const User = require('../models/UserModel');
const nodemailer = require("nodemailer");
const router = express.Router();

//----------FOR TESTING ONLY----------------------------
router.get('/amit', function(req, res, next) {
     res.send({Name: "Amit in routes"});

     var transporter = nodemailer.createTransport({
       service: 'gmail',
        auth: {
          user: 'noreply.dsiapp@gmail.com',
          pass: 'ataaknowsthepassword'
        }
});

    var mailOptions = {
        from: 'noreply.dsiapp@gmail.com',
        to: 'theamit97@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
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

  /*----------TODO-------------------------
    ----Implement duplicate books
  ----------TODO--------------------------*/
    if(req.query.Subject == ""){
         Book.find({}, function(err, docs) {
               res.send(docs);

         });
    }
    else{
         Book.find({Subject: req.query.Subject}, function(err, docs) {
               res.send(docs);
         });
    }
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
