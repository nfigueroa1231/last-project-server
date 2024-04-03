var express = require('express');
var router = express.Router();

const User = require('../models/User')

//Get by Id
router.get('/details/:userId', (req, res, next) => {

  User.findById(req.params.userId)
    .then((foundUser) => {
      console.log("User found ===>", foundUser)
      res.json(foundUser)
    })
    .catch((err) => {
      console.log(err)
      res.json(err)
    })
})

module.exports = router;


