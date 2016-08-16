var mongoose = require('mongoose');

var plantInfoSchema = mongoose.Schema({
	plantName: String,
	plantImg: String,
	plantCount: Number,
	plantMoisture: String,
	plantLight: String,
	plantPh: Number,
});

var Plant = mongoose.model("Plant", plantInfoSchema);

module.exports = Plant;