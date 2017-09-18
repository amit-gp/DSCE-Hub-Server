const express = require('express');
const CollegeNotification = require('../models/collegeNotificationModel');
const Book = require('../models/bookModel')
const User = require('../models/UserModel');
const nodemailer = require("nodemailer");
const router = express.Router();
var multer = require('multer');
const date = require('date-and-time');
var dateTime = require('node-datetime');
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
        text: 'Please click the link below to conform your email:\n' + 'http://ec2-13-126-113-185.ap-south-1.compute.amazonaws.com:4000/userActivate/?hash=' + hash + '&email=' + email
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

     console.log(req.query.email + "\n");
    const hash = crypto.createHmac('sha256', key).update(req.query.email).digest('hex');
    if(hash == req.query.hash){
         console.log("\nHash is equal");
        User.findOne({Email: req.query.email}, function(err, user) {
             console.log("\nMongo Query result : " + user);
            if(user){
                user.Activated = 'true';
                user.save();
                console.log("Account activated");
                res.sendFile('public/accountActivated.html', {root: __dirname});
            }
            else {
                console.log("\nUser is not found...");
                res.status(404).send('User not found !');
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

    //console.log(req.query);

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

router.get('/downloadAttachment', function(req, res) {
    var file = __dirname + '/../uploads/' + req.query.filename + req.query.extension
    res.download(file);
});

router.get('/collegeNotification', function(req, res, next) {

          //console.log(req.query);

          if(req.query.year == 'admin'){

               CollegeNotification.find({}, function(err, docs) {
               //res.setHeader('Cache-Control', 'public, max-age=31557600');
               //console.log(docs);
               res.send(docs);
               });
          }
          else{
               //console.log(req.query.year);
               CollegeNotification.find({ "$or" : [{messageLevel: req.query.year},{messageLevel: "college"}] }, function(err, docs) {
               //res.setHeader('Cache-Control', 'public, max-age=31557600');
               res.send(docs);
               //console.log(docs);
               });
          }
});

router.get('/heartBeat', function(req, res, next) {

     //console.log(req.query);

     CollegeNotification.count({ "$or" : [{messageLevel: req.query.year},{messageLevel: "college"}] }, function(err, count) {
          res.send({Count: count});
     });
});

var mfile;
var mfileExtension;
//POST API IS STILL IN DEV MODE NOT FINAL !!!
router.post('/collegeNotification', function(req, res, next) {

     var dt = dateTime.create();
     var formatted = dt.format('d/m/Y');
     req.body.DatePosted = formatted;
    //console.log('Inside !!');
    CollegeNotification.create(req.body).then(function(collegeNotification) {
         res.send(collegeNotification);
    }).catch(next);
});

//cb(null, file.fieldname + '-' + Date.now() + '.jpg')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, mfile + mfileExtension)
    }
});

var upload = multer({ storage: storage }).single('profileImage');


router.post('/notificationAttachment', function (req, res) {

    //console.log(req);
    mfile = req.query.attachmentName;
    mfileExtension = req.query.extension;

    upload(req, res, function (err) {
        if (err) {
            // An error occurred when uploading
        }
        res.json({
            success: true,
            message: 'Image uploaded!'
        });

        // Everything went fine
    })
});

router.post

module.exports = router;
