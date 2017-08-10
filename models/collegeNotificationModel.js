const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CollegeNotificationSchema = new Schema({
     message:{
          type: String,
          required: [true, "Message cannot be left empty !"]
     }
});

const CollegeNotification = mongoose.model('CollegeNotification', CollegeNotificationSchema);
module.exports = CollegeNotification;
