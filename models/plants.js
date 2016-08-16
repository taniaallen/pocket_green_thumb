var mongoose = require('mongoose');

var plantInfoSchema = mongoose.Schema({
	name: String,
	img: String,
	count: Number,
	moisture: String,
	light: String,
	pH: Number,
});

var Plant = mongoose.model("Plant", plantInfoSchema);

module.exports = Plant;