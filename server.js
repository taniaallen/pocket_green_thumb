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
var usersController = require('./controllers/usersController.js');
var plantsController = require('./controllers/plantsController');


/*  Middleware  */
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/users', usersController);

/* Seed path */
app.use('/plants', plantsController);


/* Basic Route  */
app.get('/', function(req, res){
    if(req.session.loggedInUsername !== undefined){
        res.render('public/index.html', {
            userLoggedIn:true
        });
    } else {
        res.render('public/index.html', {
            userLoggedIn:false
        });
    }
});
/* Server  */

mongoose.connect(mongoDBURI);
mongoose.connection.once('open', function(){
	console.log('Connected to Mongod!');
});

app.listen(port, function(){
	console.log('server started on port: ' + port);
});
