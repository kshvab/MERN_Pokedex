const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    userID: String,
    name: String,
    email: String,
    picture: String,
    favorite: [
      {
        id: String
      }
    ]
  },
  {
    timestamps: true
  }
);
/*
let User = mongoose.model('User', userSchema);
module.exports = User;
*/
module.exports = mongoose.model('User', userSchema);
