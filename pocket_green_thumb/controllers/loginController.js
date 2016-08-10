var express = require('express');
var router	= express.Router();
var bcrypt	= require('bcrypt');
var User	= require('../models/users.js');

// Login action for existing users
// If username and password exists, go to the main page, else redirect to the sign up page.
router.post('/', function(req,res){
	User.findOne({username:req.body.username}, function(err,foundUser){
		if(bcrypt.compareSync(req.body.password, foundUser.password)) {
			req.session.loggedInUsername = foundUser.username;
			res.render
		}
	})
})