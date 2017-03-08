var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var sensorSchema = new Schema({
	Sensor_ID: { type: String, required: true },
	Current: { type: Number, required: true },
	Date: { type: Date, required: true}
});

var Sensor = mongoose.model("Sensor", sensorSchema);

module.exports = Sensor;