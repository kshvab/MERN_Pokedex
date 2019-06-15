const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    id: String,
    name: String,
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
