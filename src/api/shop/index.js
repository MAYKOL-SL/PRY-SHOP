let express = require('express');
let usersController = require('./users.controller');

let router = express.Router();

router.get('/users/signin', usersController.getUsersSignin);
router.get('/users/signup', usersController.getUserSignup)

module.exports = router;