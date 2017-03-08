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

var cmd = "./generateJSON.o";
var generateJSON;

var sensorPath = path.resolve(__dirname, "sensors");
var sensor1JSON;
var sensor2JSON;

var port = process.env.port || 3000;
mongoose.connect("mongodb://localhost:27017/newdb");

app.use(passport.initialize());
passport_I(passport);
app.use(express.static(path.resolve(__dirname, "public")));
app.use(morgan("combined"));

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", function(request, response) {
	response.render("index");
});

app.get("/auth_test", passport.authenticate("jwt", config.session), function(request, response) {
	response.send("Log in Worked");
});

app.get("/failed", function(request, response) {
	response.send("failed");
});

app.get("/sensor_1", function(request, response) {
	if (typeof sensor1JSON != "undefined") {
		response.status(202).json(sensor1JSON);
	} 
	else {
		response.status(404).send("No File Found");
	}
	
});

app.get("/sensor_2", function(request, response) {

	if (typeof sensor2JSON != "undefined") {
		response.status(202).json(sensor2JSON);
	} 
	else {
		response.status(404).send("No File Found");
	}
});

app.get("/get_all", function(request, response) {

	var DB_count;
 	console.log("Get all");

 	Sensor.find({ Sensor_ID: 1 }, function(err, count) {
 		if (err) {
 			throw err;
 		}
 		DB_count = count.length;
 		console.log("COUNT:" + DB_count);
 	})
 	response.status(404).send(DB_count);
});

app.post("/signup", function(request, response) {
	if (request.body.username && request.body.password) {
		User.find({username : request.body.username}, function (err, entry) {
			if (err) {
				throw err;
			}
			if (entry.length) {
				response.status(404).send("Username Already Exist");
			}
			else {
				var newUser = new User({
					username: request.body.username,
					password: request.body.password
				});
				console.log("Igot here");
				newUser.save(function(err) {
					if (err) {
						throw err;
					}
					response.status(202).send("New User Created");
				});
			}
		});
	}
	else {
		response.status(404).send("No Username or Password");
	}
}); 

app.post("/authenticate", function(request, response) {
	User.findOne({ username : request.body.username }, function(err, user) {
		if (err) {
			throw err;
		}
		if (!user) {
			response.status(404).send("User Not Found");
		}
		else {
			user.checkPassword(request.body.password, function(err, isMatch) {
				if (isMatch) {
					var token = jwt.sign(user, config.secret, {expiresIn: "5h"});
					response.json({status: "TokenGranted", message: "JWT" + token});
				} else {
					response.json({status: "AuthFailed", message: "Authentication Failed: Incorrected Password"});
				}
			});
		}
	});
});

app.get("/add", function(request, response) {
	var newSensorData;
	if (typeof sensor1JSON != "undefined") {
		newSensorData = new Sensor({
			Sensor_ID: sensor1JSON.Sensor_ID,
			Current: sensor1JSON.Current,
			Date: new Date(sensor1JSON.Date)
		});
		
		newSensorData.save(function(err) {
			if (err) {
				throw err;
			}
			console.log("Sensor Entry Created!")
		});

		response.status(202).send("ADDED!");
	}
	else {
		response.status(404).send("FAILED TO ADD!");
	}
});

app.use(function(request, response) {
	response.status(404).render("404");
});

app.listen(3000, function() {
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

