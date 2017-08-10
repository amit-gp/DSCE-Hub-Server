const express = require('express');
const CollegeNotification = require('../models/collegeNotificationModel');
const router = express.Router();

router.get('/', function(req, res) {
     res.send({Name: "Amit in routes"});
});

router.get('/collegeNotification', function(req, res) {
          CollegeNotification.find({messageLevel: "college"}, function(err, docs) {
          res.send(docs);     
     });
});

//POST API IS STILL IN DEV MODE NOT FINAL !!!
router.post('/collegeNotification', function(req, res) {
     CollegeNotification.create(req.body).then(function(collegeNotification) {
          res.send(collegeNotification);
     });
});

module.exports = router;
