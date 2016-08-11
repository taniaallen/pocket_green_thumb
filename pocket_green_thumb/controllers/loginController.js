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
			res.send(foundUser);
			} else {
			res.redirect('/');
		}
	});
});

// Route for login/ New User page
router.get('/newuser', function(req,res){
	res.render('public/index');
});

// Post new username and password here
router.post('/newuser', function(req,res){
	req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
	User.create(req.body, function(err, user) {
		res.send(user);
	});
});

module.exports = router;