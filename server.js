// BASE SETUP
// =====================

//CALL THE PACKAGES ---
var express    = require('express'); // call express
var Event      = require('./app/models/event');
var app        = express(); // define our app
var bodyParser = require('body-parser'); // get body-parser
var path       = require('path');
var morgan     = require('morgan'); // used to see requests
var mongoose   = require('mongoose'); // for working w/ our databse
var port       = process.env.PORT || 8080; //set the port for our app

//APP CONFIGURATION ---
//use body parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

//configure our app to handle CORS requests
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \
Authorization');
	next();
});

//connect to our database (hosted on modulus.io)
mongoose.connect('mongodb://localhost:27017/myDatabase');

// log all requests to the console
app.use(morgan('dev'));

//ROUTES FOR OUR API
// =====================

// basic routes for the home page
app.get('/', function(req, res) {
res.sendFile(path.join(__dirname + '/public/index.html'));});

//get an instance of the express router
var apiRouter = express.Router();


// test route to make sure everything is working
// accessed at GET http://localhost:8080/api
apiRouter.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });
});

apiRouter.route('/events')
	
	// create an event (accessed at POST http://localhost:8080/api/events)
	.post(function(req, res) {
		// create a new instance of the event model
		var event = new Event();

		// set the event information (comes from the request)
		event.name = req.body.name;

		// save and check for errors
		event.save(function(err) {
			if (err) {
				//duplicate entry
				if (err.code == 11000)
					return res.json({ success: false, message: 'already exists'});
				else
					return res.send(err);
			}
				res.json({message: 'event created!'});

			
		});
	})

	// get all events (GET http://localhost:8080/api/events)
	.get(function(req, res) {
		Event.find(function(err, events) {
			if(err) res.send(err);

			// return the users
			res.json(events);
		});
	})


// more routes for our API will happen here

//REGISTER OUR ROUTES ----------
//all of our routes will be prefixed with /api
app.use('/api', apiRouter);

//START THE SERVER
// ============================
app.listen(port);
console.log('Magic happens on port ' + port);



