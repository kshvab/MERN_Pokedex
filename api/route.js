const express = require('express');
const userRoutes = express.Router();

// Require User model in our routes module
let User = require('./userDbModel');

// Defined store route
userRoutes.route('/add').post(function(req, res) {
  let user = new User(req.body);
  user
    .save()
    .then(user => {
      res.status(200).json({ user: 'user is added successfully' });
    })
    .catch(err => {
      res.status(400).send('unable to save to database');
    });
});

// Defined get data(index or listing) route
userRoutes.route('/').get(function(req, res) {
  User.find(function(err, useres) {
    if (err) {
      console.log(err);
    } else {
      res.json(useres);
    }
  });
});

// Defined edit route
userRoutes.route('/edit/:id').get(function(req, res) {
  let id = req.params.id;
  User.findById(id, function(err, user) {
    res.json(user);
  });
});

//  Defined update route
userRoutes.route('/update/:id').post(function(req, res) {
  console.log(req.body.favorite);
  User.findOneAndUpdate(
    { id: req.params.id }, // критерий выборки
    {
      $set: {
        favorite: req.body.favorite
      }
    }, // параметр обновления
    function(err, result) {
      if (err) res.status(400).send('unable to update the database');
      else {
        res.json('Update complete');
      }
    }
  );

  /*
  User.findOneAndUpdate({ userID: req.params.id }, function(err, user) {
    console.log(user);
    if (!user) res.status(404).send('data is not found');
    else {
      user.userID = req.body.userID;
      user.name = req.body.name;
      user.email = req.body.email;
      user.picture = req.body.picture;
      user.favorite = req.body.favorite;
      user
        .save()
        .then(user => {
          res.json('Update complete');
        })
        .catch(err => {
          res.status(400).send('unable to update the database');
        });
    }
  });

*/
});

// Defined delete | remove | destroy route
userRoutes.route('/delete/:id').get(function(req, res) {
  User.findByIdAndRemove({ _id: req.params.id }, function(err, user) {
    if (err) res.json(err);
    else res.json('Successfully removed');
  });
});

module.exports = userRoutes;
