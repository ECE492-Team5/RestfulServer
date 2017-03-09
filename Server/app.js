/*
app.js

Written by: Jiawei Wu of ECE492 group 5
Date: 03/08/2017

Main Server File, uses the Express.js framework and 
to serve sensor and user information.

Also uses Passport and JSON Web Tokens for 
authentication.
*/

/********************************
Importing all necessary packages
********************************/
var express  	= require("express");
var app 	 	= express();
var path 	 	= require("path");
var morgan 	 	= require("morgan");
var fs			= require("fs");
var bodyParser	= require("body-parser");
var spawn 	 	= require("child_process").spawn;

var mongoose 	= require("mongoose");

var Sensor   	= require("./models/sensor_schema");
var User 	 	= require("./models/user_schema");
var config   	= require("./config");
var passport 	= require("passport");
var jwt      	= require("jsonwebtoken");
var passport_I  = require("./passport");

//Command for running native C code to handle 
//generation of sensor data
var cmd = "./generateJSON.o";
var generateJSON;

//Sensor file path and variables
var sensorPath = path.resolve(__dirname, "sensors");
var sensor1JSON;
var sensor2JSON;

//Port to listen on
var port = process.env.port || 3000;
//Connect to Mongodb database
mongoose.connect("mongodb://localhost:27017/test");

//Initializing User Authentication
app.use(passport.initialize());
passport_I(passport);

//Static files
app.use(express.static(path.resolve(__dirname, "public")));
//Initialize Morgan, used for logging
app.use(morgan("combined"));

//Setting HTML view engine to render HTML page
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

//Initializing BodyParser to parse POST bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Main page, responds with index.html and 200 HTTP status code
app.get("/", function(request, response) {
	response.status(200).render("index");
});

//Gets value for first sensor, requires authorization
app.get("/sensor_1", passport.authenticate("jwt", config.session), function(request, response) {
	if (typeof sensor1JSON != "undefined") {
		response.status(200).json(sensor1JSON);
	} 
	else {
		response.status(404).send({status: "dataError", message: "Sensor 1: No File Found"});
	}
	
});

//Gets value for second sensor, requires authorization
app.get("/sensor_2", passport.authenticate("jwt", config.session), function(request, response) {

	if (typeof sensor2JSON != "undefined") {
		response.status(200).json(sensor2JSON);
	} 
	else {
		response.status(404).send({status: "dataError", message: "Sensor 2: No File Found"});
	}
});

//Gets value for all stored first sensor, requires authorization
app.get("/get_all_sensor_1", passport.authenticate("jwt", config.session),  function(request, response) {

 	Sensor.find({ Sensor_ID: 1 }, function(err, entry) {
 		if (err) {
 			throw err;
 		}
 		response.status(200).send(entry);
 	});
});

//Gets value for all stored second sensor, requires authorization
app.get("/get_all_sensor_2", passport.authenticate("jwt", config.session), function(request, response) {

 	Sensor.find({ Sensor_ID: 2 }, function(err, entry) {
 		if (err) {
 			throw err;
 		}
 		response.status(200).send(entry);
 	});
});

//Deletes all stored sensor data, used for testing
app.get("/delete_sensor", function(request, response) {
	Sensor.remove({}, function(err) {
		if (err) {
			console.log(err);
		}
		response.status(200).send({status: "dataDeleted", message: "Sensor Data Deleted"});
	});
});

//Deletes all stored user data, used for testing
app.get("/delete_users", function(request, response) {
	User.remove({}, function(err) {
		if (err) {
			console.log(err);
		}
		response.status(200).send({status: "dataDeleted", message: "User Data Deleted"});
	});
});

//Store Sensor value
app.get("/add", passport.authenticate("jwt", config.session), function(request, response) {
	var newSensorData;
	if (typeof sensor1JSON != "undefined" && typeof sensor2JSON != "undefined") {
		newSensor1Data = new Sensor({
			Sensor_ID: sensor1JSON.Sensor_ID,
			Current: sensor1JSON.Current,
			Date: new Date(sensor1JSON.Date),
			Unit: sensor1JSON.Unit
		});

		newSensor2Data = new Sensor({
			Sensor_ID: sensor2JSON.Sensor_ID,
			Current: sensor2JSON.Current,
			Date: new Date(sensor2JSON.Date),
			Unit: sensor2JSON.Unit
		});
		
		newSensorData1.save(function(err) {
			if (err) {
				throw err;
			}
		});
		newSensorData2.save(function(err) {
			if (err) {
				throw err;
			}
		});
		response.status(200).send({status: "dataSaved", message: "Data Saved To Database"});
	}
	else {
		response.status(404).send({status: "dataError", message: "Data Failed to Save To Database"});
	}
});

//POST for sign up, body must include username and password
//Password is salted so no plain-text is stored
app.post("/signup", function(request, response) {
	if (request.body.username && request.body.password) {
		User.find({username : request.body.username}, function (err, entry) {
			if (err) {
				throw err;
			}
			if (entry.length) {
				response.status(404).send({status: "UsernameError", message: "Username Already Exist"});
			}
			else {
				var newUser = new User({
					username: request.body.username,
					password: request.body.password
				});
				newUser.save(function(err) {
					if (err) {
						throw err;
					}
					response.status(200).send({status: "UserCreated", message: "User Successfully Created"});
				});
			}
		});
	}
	else {
		response.status(404).send({status: "UserCreateError", message: "No Username or Password"});
	}
}); 

//POST signing in and authentication, body must include username and password
//Returns token
app.post("/signin", function(request, response) {
	User.findOne({ username : request.body.username }, function(err, user) {
		if (err) {
			throw err;
		}
		if (!user) {
			response.status(404).send({status: "AuthFailed", message: "User Not Found"});
		}
		else {
			user.checkPassword(request.body.password, function(err, isMatch) {
				if (isMatch) {
					var token = jwt.sign(user, config.secret, {expiresIn: "5h"});
					response.json({status: "TokenGranted", message: "JWT " + token});
				} else {
					response.json({status: "AuthFailed", message: "Authentication Failed: Incorrected Password"});
				}
			});
		}
	});
});

//Middleware for failed authentication attempts
app.get("/failed", function(request, response) {
	response.status(404).send({status: "AuthFailed", message: "Please Authenticate First"});
});

//Middleware for other errors
app.use(function(request, response) {
	response.status(404).render("404");
});

//Starts the server and native C program
//Atomic IO, thread safe
app.listen(port, function() {
	console.log("App started on port 3000");
	generateJSON = spawn(cmd);

	setInterval(function() {
		fs.readFile(sensorPath + "/sensor_1.json", "utf8", function (err, data) {
			if (err) {
				throw err;
			}
			sensor1JSON = JSON.parse(data);
		});
	}, 1000);

	setInterval(function() {
		fs.readFile(sensorPath + "/sensor_2.json", "utf8", function (err, data) {
			if (err) {
				throw err;
			}
			sensor2JSON = JSON.parse(data);
		});
	}, 1000);
});

//Exports app for testing
module.exports = app;
