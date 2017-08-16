const express = require('express');
const CollegeNotification = require('../models/collegeNotificationModel');
const Book = require('../models/bookModel')
const User = require('../models/UserModel');
const nodemailer = require("nodemailer");
const router = express.Router();
const crypto = require('crypto');
const key = 'RameshBabu'; //Name of the HOD of CSE department at the time ! -----------------------------------------------------------

var transporter = nodemailer.createTransport({
  service: 'gmail',
   auth: {
     user: 'noreply.dsiapp@gmail.com',
     pass: 'ataaknowsthepassword'
   }
});

function sendMailTo(email) {

    const hash = crypto.createHmac('sha256', key).update(email).digest('hex');

    var mailOptions = {
        from: 'noreply.dsiapp@gmail.com',
        to: email,
        subject: 'Account Conformation',
        text: 'Please click the link below to conform your email:\n' + 'http://ec2-54-169-218-212.ap-southeast-1.compute.amazonaws.com:4000/userActivate/?hash=' + hash + '&email=' + email
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

//----------FOR TESTING ONLY----------------------------  Email verification
router.get('/amit', function(req, res, next) {
     res.send({Name: "Amit in routes"});
});
//----------FOR TESTING ONLY----------------------------

router.get('/userActivate', function(req, res, next) {

    const hash = crypto.createHmac('sha256', key).update(req.query.email).digest('hex');
    if(hash == req.query.hash){
        User.findOne({Email: req.query.email}, function(err, user) {
            if(user){
                user.Activated = 'true';
                user.save();
                res.sendFile('public/accountActivated.html', {root: __dirname});
            }
            else {
                // To implemnt user not exist ---------------------------------
            }

        });
    }
    //Give back HTML PAGE of successful activation --------------------------------------------------------------

});

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

                    sendMailTo(user.Email);
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
               res.send({Login: "Unsuccessful", Activated: "false"});
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
    else if (req.query.delete == "true") {
        Book.findOneAndRemove({Title: req.query.book, Name: req.query.name}, function(err, doc) {
            if(err){
                res.send(err);
            }
            else {
                res.send(doc);
            }
    });
}
    else if (req.query.Subject == "myBooks") {
        Book.find({Name: req.query.Name}, function(err, docs) {
              res.send(docs);
        });
    }
    else{
         Book.find({Subject: req.query.Subject}, function(err, docs) {
               res.send(docs);
         });
    }
});

router.delete('/book', function(req, res, next) {
    Book.findOneAndRemove({Title: req.query.book, Name: req.query.name}, function(err, doc) {
        if(err){
            res.send(err);
        }
        else {
            res.send(doc);
        }
    });
})

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
