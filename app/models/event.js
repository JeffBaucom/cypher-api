// packges
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// event Schema

var EventSchema = new Schema({
	name: String,
	address : {type: String, required: false},
	lat : {type: Number, required: true},
	lng : {type: Number, required: true},
	start: {type: String, required: true},
    end: {type: String, required: true},
	styles: [String],
	kind: [String],
	about: {type: String}
});


//return the model
module.exports = mongoose.model('Event', EventSchema)
