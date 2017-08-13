const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSelling = require('./UserModel');

const BookSchema = new Schema ({

      Title: {
        type: String,
        required: [true, "Book Name cannot be left empty !"]
      },

      Author: {
        type: String,
        required: [true, "Author Name cannot be left empty !"]
      },

      Price: {
        type: String,
        required: [true, "Price of book cannot be left empty"]
      },

      Subject: {
        type: String,
        required: [true, "Subject cannot be left empty !"]
      },

      Description:{
        type: String,
        required: [true, "Description cannot be left empty !"]
      },

      Edition: {
        type: String,
        required: [false]
      },

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
      }
});

const User = mongoose.model('Book', BookSchema);
module.exports = User;
