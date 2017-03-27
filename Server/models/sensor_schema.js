/*
sensor_schema.js

Written by: Jiawei Wu of ECE492 group 5
Date: 02/01/2017

Defines the sensor schema to allow storage 
into the mongodb database
*/
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var sensorSchema = new Schema({
	Sensor_ID: { type: String, required: true },
	Current: { type: Number, required: true },
	Date: { type: Date, required: true},
	DateCreated: { type: Date, default: Date.now},
	Unit: { type: String, required: true}
});

var Sensor = mongoose.model("Sensor", sensorSchema);

module.exports = Sensor;