var express			= require('express');
var mongoose		= require('mongoose');
var bodyParser 		= require('body-parser');
var methodOverride 	= require('method-override');
var bcrypt			= require('bcrypt');



/* Application settings */
var app = express();
var port = process.env.PORT || 3000












app.listen(port, function(){
	console.log('server started!');
});
