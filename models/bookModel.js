const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSelling = require('.UserModel');

const BookSchema = new Schem{

      Title: {
        type: String,
        required: [true, "Book Name cannot be left empty !"]
      },

      Author: {
        type: String,
        required: [true, "Author Name cannot be left empty !"]
      },

      Price: {
        type: Number,
        required: [true, "Price of book cannot be left empty"]
      },

      Subject: {
        type: String,
        required: [true, "Subject cannot be left empty !"]
      },

      Edition: {
        type: String,
        required: [flase]
      },

      UserSelling: userSelling
}

const User = mongoose.model('Book', BookSchema);
module.exports = User;
