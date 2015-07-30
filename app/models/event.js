// packages
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// event Schema

var EventSchema = new Schema({
	name: String,
	lat: Number,
	lng: Number
});


//return the model
module.exports = mongoose.model('Event', EventSchema)