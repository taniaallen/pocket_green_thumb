var express			= require('express');
var session 		= require('express-session');
var mongoose		= require('mongoose');
var bodyParser 		= require('body-parser');
var methodOverride 	= require('method-override');
var bcrypt			= require('bcrypt');


/* App settings */
var app = express();
var port = process.env.PORT || 3000
var mongoDBURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/greenthumb'

app.use(session({
	secret: 'lonestar',
	resave: false,
	saveUninitialized: false
}));


/*   DB   */
var loginController = require('./controllers/loginController.js');
var usersController = require('./controllers/usersController.js');


/*  Middleware  */
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.use('/login', loginController);
app.use('/users', usersController);


/* Basic Route to test connection  */
app.get('/', function(req,res){
	res.render('public/index.html');
});

/* Server  */

mongoose.connect(mongoDBURI);
mongoose.connection.once('open', function(){
	console.log('Connected to Mongod!');
});

app.listen(port, function(){
	console.log('server started!');
});
