const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({

     Name: {
          type: String,
          required: [true, "User Name cannot be left empty !"]
     },

     Email: {
          type: String,
          required: [true, "User Email cannot be left empty !"]
     },

     ContactNumber: {
          type: String,
          required: [true, "User Number cannot be left empty !"]
     },

     Password: {
          type: String,
          required: [true, "User Password cannot be left empty !"]
     },

     USN_Number: {
          type: String,
          required: [false]
     },

     Admin: {
          type: String,
          required: [true]
     },

     Activated: {
         type: String,
         required: [true]
    },
    year:{
         type: String,
         required: [true]
    }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
