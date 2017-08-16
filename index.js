const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

app.set('view engine', 'jade');
//Middlewares (order is important)
app.use(bodyParser.json());
app.use(require('./routes/routes'));

//Error handling middleware
app.use(function(err, req, res, next) {
     //console.log("ERROR: " + err);
     res.status(422).send({
          error: err.message
     });
})

//Connect to mongodb
mongoose.connect('mongoDb://localhost/dsi-official-server', { useMongoClient: true });﻿
mongoose.Promise = global.Promise;

app.listen(process.env.port || 4000, function() {
     console.log("Listening at PORT: 4000");
});
