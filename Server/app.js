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
var fs			= require("./sensorReader");
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

//Port to listen on
var port = process.env.port || 3000;
//Connect to Mongodb database
mongoose.connect("mongodb://localhost:27017/test");

//Initializing User Authentication
app.use(passport.initialize());
passport_I(passport);

//Static files
app.use('/public', express.static(path.join(__dirname + '/public')));

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
	response.status(200).render("signin");
});

app.get("/index/:username/:token", function(request, response) {
	var name = request.params.username;
	console.log("USERNAME: " + name);
	var token = request.params.token;
	User.findOne({username: name}, function(err, entry) {
 		if (err) {
 			throw err;
 		}
 		if (!entry) {
 			response.status(404).send({status: "AuthFailed", message: "User Not Found"});
 		} else {
 			var tempToken = entry.password;
 			if (tempToken.replace(/[^a-zA-Z ]/g, "") === token) {
 				response.status(200).render("index");
 			}
 		}
 	});
});

app.get("/sensor_:sensorID", passport.authenticate("jwt", config.session), function(request, response) {
	var sensorID = request.params.sensorID;
	if ((sensorID < 1 || sensorID > 8) || isNaN(sensorID)) {
		response.status(404).send({status: "inputError", message: "Please Enter An ID Between 1 and 8"});
		return;
	}
	var sensorJSON = fs.returnSensor(sensorID);
	if (typeof sensorJSON != "undefined") {
		response.status(200).json(sensorJSON);
	} 
	else {
		response.status(404).send({status: "dataError", message: "Sensor 1: No File Found"});
	}
});

//Gets value for all stored first sensor, requires authorization
app.get("/get_sensor_:sensorID" /*,passport.authenticate("jwt", config.session)*/,  function(request, response) {
	var sensorID = request.params.sensorID;
	if ((sensorID < 1 || sensorID > 8) || isNaN(sensorID)) {
		response.status(404).send({status: "inputError", message: "Please Enter An ID Between 1 and 8"});
		return;
	}
 	Sensor.find({ Sensor_ID: sensorID }, function(err, entry) {
 		if (err) {
 			throw err;
 		}
 		response.status(200).send(entry);
 	});
});

app.get("/get_all_sensors" /*,passport.authenticate("jwt", config.session)*/,  function(request, response) {
 	Sensor.find({}, function(err, entry) {
 		if (err) {
 			throw err;
 		}
 		response.status(200).send(entry);
 	});
});

//Deletes all stored sensor data, used for testing
app.get("/delete_sensors", function(request, response) {
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

app.get("/get_users", function(request, response) {
	User.find({}, function(err, entry) {
 		if (err) {
 			throw err;
 			console.log(err);
 		}
 		response.status(200).send(entry);
 	});
});

//Store Sensor value
app.get("/add_:sensorID"/*,passport.authenticate("jwt", config.session)*/, function(request, response) {
	var sensorID = request.params.sensorID;
	if ((sensorID < 1 || sensorID > 8) || isNaN(sensorID)) {
		response.status(404).send({status: "inputError", message: "Please Enter An ID Between 1 and 8"});
		return;
	}
	var sensorJSON = fs.returnSensor(sensorID);
	var newSensorData;
	if (typeof sensorJSON != "undefined") {
		newSensorData = new Sensor({
			Sensor_ID: sensorJSON.Sensor_ID,
			Current: sensorJSON.Current,
			Date: new Date(sensorJSON.Date),
			Unit: sensorJSON.Unit
		});
		
		newSensorData.save(function(err) {
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
				response.status(404).send({status: "UserCreateError", message: "Username Already Exist"});
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
	var tempToken;
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
					tempToken = user.password;
					response.json({status: "TokenGranted", message: "JWT " + token, tempToken: tempToken.replace(/[^a-zA-Z ]/g, "")});
			
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
	//generateJSON = spawn(cmd);

	setInterval(function() {
		fs.read(sensorPath + "/sensor_1.json", "utf8", 1)
	}, 1000);

	setInterval(function() {
		fs.read(sensorPath + "/sensor_2.json", "utf8", 2)
	}, 1000);

	setInterval(function() {
		fs.read(sensorPath + "/sensor_3.json", "utf8", 3)
	}, 1000);

	setInterval(function() {
		fs.read(sensorPath + "/sensor_4.json", "utf8", 4)
	}, 1000);

	setInterval(function() {
		fs.read(sensorPath + "/sensor_5.json", "utf8", 5)
	}, 1000);

	setInterval(function() {
		fs.read(sensorPath + "/sensor_6.json", "utf8", 6)
	}, 1000);

	setInterval(function() {
		fs.read(sensorPath + "/sensor_7.json", "utf8", 7)
	}, 1000);

	setInterval(function() {
		fs.read(sensorPath + "/sensor_8.json", "utf8", 8)
	}, 1000);

	

	// setInterval(function() {
	// 	fs.readFile(sensorPath + "/sensor_2.json", "utf8", function (err, data) {
	// 		if (err) {
	// 			throw err;
	// 		}
	// 		sensor2JSON = JSON.parse(data);
	// 	});
	// }, 1000);
});

//Exports app for testing
module.exports = app;
