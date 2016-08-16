var mongoose 		= require('mongoose');
var plantInfoSchema	= require('./plants.js').schema;


var userSchema = mongoose.Schema ({
	username: String,
	password: String,
	name: String,
	plants: [plantInfoSchema],
	garden: []
});

var User = mongoose.model('User', userSchema);

module.exports = User;