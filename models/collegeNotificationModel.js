const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CollegeNotificationSchema = new Schema({
     messageTitle:{
          type: String,
          required: [true, "Message title cannot be left empty !"]
     },
     message:{
          type: String,
          required: [true, "Message cannot be left empty !"]
     },
     messageLevel:{
          type: String,
          required: [true, "Message level cannot be left empty !"]
     },
     hasAttachment:{
         type: String,
         required: [true, "Has Attachmentcannot be left empty !"]
     },
     attachmentName:{
         type: String,
         required: [false]
     },
     attachmentType:{
         type: String,
         required: [false]
     },
     attachmentNameReal:{
         type: String,
         required: [false]
     }
});

const CollegeNotification = mongoose.model('CollegeNotification', CollegeNotificationSchema);
module.exports = CollegeNotification;
