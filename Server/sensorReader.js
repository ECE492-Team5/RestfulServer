var fs = require("fs");

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
		eval("sensorJSON" + ID + " = JSON.parse(data)");
	});
};

var returnSensor = function(ID) {
	var sensorJSON = eval("sensorJSON" + ID);
	return sensorJSON;
}

module.exports = {
	read: read,
	returnSensor: returnSensor
};