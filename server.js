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
app.use(bodyParser.urlencoded({ extended: true})); // set body parser to extended for nested JSON
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // so we can get static files in the dir

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

// For routes at /api/events
apiRouter.route('/events')
	
	// create an event (accessed at POST http://localhost:8080/api/events)
	.post(function(req, res) {
        if (!req.body) return res.sendStatus(400);
		// create a new instance of the event model
		var event = new Event();

		// set the event information (comes from the request)
		event.name = req.body.name;
        event.address = req.body.address;
        event.lat = req.body.lat;
        event.lng = req.body.lng;
        event.start = req.body.start;
        event.end = req.body.end;
        event.styles = req.body.styles;
        event.kind = req.body.kind;
        event.about = req.body.about;

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
	});

// For routes at /api/events/:event_id
// Routes on a specific event
apiRouter.route('/events/:event_id')

    // get the event with this id
    // (GET http://localhost:8080/api/events/:event_id)
    .get(function(req, res) {
        // Use our Event model
        Event.findById(req.params.event_id, function(err, event) {       
            if (err) { res.send(err)}; 
            // return the event
            res.json(event);
        });
     })
    
    // put the event with this id
    // (PUT http://localhost:8080/api/events/:event_id)
    .put(function(req, res) {
        // Use our Event model
        Event.findById(req.params.event_id, function(err, event) {       
            
            if (err) { res.send(err)}; 
            
            if (req.body.name) event.name = req.body.name;
            if (req.body.address) event.address = req.body.address; 
            if (req.body.lat) event.lat  = req.body.lat; 
            if (req.body.lng) event.lng = req.body.lng; 
            if (req.body.start) event.start = req.body.start; 
            if (req.body.end) event.end = req.body.end; 
            if (req.body.styles) event.styles = req.body.styles; 
            if (req.body.kind) event.kind = req.body.kind; 
            if (req.body.about) event.about = req.body.about; 
       
            event.save(function(err) {
                if (err) res.send(err);

                //return success message
                res.json({ message: 'Event updated'});
            });
        });
    })
    
    // delete the event with this id
    // (GET http://localhost:8080/api/events/:event_id)
    .delete(function(req, res) {
        // Use our Event model
        Event.remove({
            _id: req.params.event_id
        }, function(err, event) {
            if (err) return res.send(err);

            res.json({ message: 'Event deleted' });
        });
     });

// more routes for our API will happen here

//REGISTER OUR ROUTES ----------
//all of our routes will be prefixed with /api
app.use('/api', apiRouter);

//START THE SERVER
// ============================
app.listen(port);
console.log('Magic happens on port ' + port);



