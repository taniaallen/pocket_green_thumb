var express = require('express');
var router	= express.Router();
var request	= require('request');
var bcrypt	= require('bcrypt');
var User	= require('../models/users.js');
var Plant   = require('../models/plants.js');

// Route for login/ New User action
router.get('/signup', function(req,res){
	res.render('public/index');
});

// Post new username and password here
router.post('/signup', function(req,res){
	// console.log('body is: ' + req.body);
	req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
	User.create(req.body, function(err, user) {
		req.session.loggedInUsername = req.body.username;
		res.send({
			data: user
		});
	});
});

// Login action for existing users
// If username and password exists, send found user data, else redirect to the sign up page.
router.post('/login', function(req,res){
	// console.log(req.body);
	User.findOne({
		username:req.body.username
	}, function(err,foundUser){
		if(foundUser == null){
			console.log('user not found!');
		} else if (foundUser.username == req.body.username) {
			if(bcrypt.compareSync(req.body.password, foundUser.password)) {
				req.session.loggedInUsername = foundUser.username;
				console.log(foundUser);
				res.send({
					data: foundUser
				});
				} else {
				res.send('failed.');
				}
		}
	});
});


// get user id information
// router.get('/:id', function(req,res){
// 	console.log(req.params.id)
// })

// Get saved plant data
router.get('/:id', function(req,res){
	User.findById(req.params.id, function(err,foundUser) {
		res.send(foundUser);
	});
});

// File a new plant to the plant list

router.post('/:id/newplant', function(req,res) {
	console.log(req.body);
	
	User.findById(req.body.user._id, function(err, foundUser) {
		Plant.create({
			name: req.body.plantName, 
			img: req.body.plantImg, 
			count: req.body.plantCount,
			moisture: req.body.plantMoisture,
			light: req.body.plantLight,
			ph: req.body.plantPh
		}, function(err, newPlant){
			if(err) console.log(err)


			foundUser.plants.push(newPlant);
			foundUser.save(function(err) {
				if(err) console.log(err);
				res.send('Plant Saved!');
			});
		});		
	});
});


module.exports = router;