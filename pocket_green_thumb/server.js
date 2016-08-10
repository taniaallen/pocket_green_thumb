var express			= require('express');
var mongoose		= require('mongoose');
var bodyParser 		= require('body-parser');
var methodOverride 	= require('method-override');
var bcrypt			= require('bcrypt');



/* Connection settings */
var app = express();
var port = process.env.PORT || 3000
var mongoDBURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/greenthumb'


/* App Settings */
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));





/* Basic Route to test connection  */
app.get('/', function(req,res){
	res.render('public/index.html');
});

/* Port and Database Connections  */

mongoose.connect(mongoDBURI);
mongoose.connection.once('open', function(){
	console.log('Connected to Mongod!');
});

app.listen(port, function(){
	console.log('server started!');
});
