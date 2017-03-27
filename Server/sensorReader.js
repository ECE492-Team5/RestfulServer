var fs = require("fs");
var Sensor= require("./models/sensor_schema");

var sensorJSON1;
var sensorJSON2;
var sensorJSON3;
var sensorJSON4;
var sensorJSON5;
var sensorJSON6;
var sensorJSON7;
var sensorJSON8;

var read = function(path, format, ID) {
	fs.readFile(path, format, function(err, data) {
		if (err) {
			console.log("Error Reading File Path: " + path);
			throw err;
		}
		var tempSensorJSON = JSON.parse(data);
		eval("sensorJSON" + ID + " = tempSensorJSON;");

		var newSensorData = new Sensor({
			Sensor_ID: tempSensorJSON.Sensor_ID,
			Current: tempSensorJSON.Current,
			Date: new Date(tempSensorJSON.Date),
			Unit: tempSensorJSON.Unit
		});

		newSensorData.save(function(err) {
			if (err) {
				console.log("Failed to save sensor data for ID: " + ID);
				throw err;
			}
		});
	});
}

var returnSensor = function(ID) {
	var sensorJSON = eval("sensorJSON" + ID);
	return sensorJSON;
}



module.exports = {
	read: read,
	returnSensor: returnSensor
};