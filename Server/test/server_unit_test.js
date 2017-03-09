/*
server_unit_test.js

Written by: Jiawei Wu of ECE492 group 5
Date: 03/08/2017

Unit testing for the server, uses Chai, Mocha, and Supertest testing packages

This unit test tests server access, database storage, account
creation, authentication with tokens, and obtaining information
from server once account has been authorized

Help taken from: 
https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai
http://mherman.org/blog/2015/09/10/testing-node-js-with-mocha-and-chai/
*/

/********************************
Importing all necessary packages
********************************/
var mongoose = require("mongoose");
var User = require("../models/user_schema");
var chai = require("chai");
var chaiHttp = require("chai-http");
var supertest = require("supertest");
var app = require("../app");
var should = chai.should();

chai.use(chaiHttp);

//Starting first test
describe("Testing Server", function() {
	var token;

	//First remove all users in database
	before(function(done) {
		User.remove({}, function(err) {
			if (err) {
				console.log(err);
			}
			else {
				done();
			}
		});
	});

	//Try accessing home directory
	it("Home Directory: GET ./ ", function(done) {

		supertest(app)
			.get("/")
			.expect(200)
			.end(function(err, response) {
				if (err) {
					done(err);
				}
				done();
			});
	});

	//Try registering new account
	it("Registering New Account", function(done) {
		var user = {username: "test_user",
					password: "test_password"};
		supertest(app)
			.post("/signup")
			.send(user)
			.expect(200)
			.end(function(err, response) {
				if(err) {
					done(err);
				}
				response.body.should.be.a("object");
				response.body.should.have.property("status");
				response.body.should.have.property("message");
				response.body.status.should.equal("UserCreated");
				done();
			});
	});

	//Try authenticating account
	it("authentication", function(done) {
		var user = {username: "test_user",
					password: "test_password"};
		supertest(app)
			.post("/signin")
			.send(user)
			.expect(200)
			.end(function(err, response) {
				if(err) {
					done(err);
				}
				response.body.should.be.a("object");
				response.body.should.have.property("status");
				response.body.should.have.property("message");
				response.body.status.should.equal("TokenGranted");
				token = response.body.message;
				done();
			});
	});

	//Now authenticated, try getting sensor value
	it("Getting Sensor: GET ./sensor_1", function(done) {
		this.timeout(1500);

    	setTimeout(function () {
      		supertest(app)
			.get("/sensor_1")
			.set("Authorization",token)
			.expect(200)
			.end(function(err, response) {
				if (err) {
					done(err);
				}
				response.body.should.be.a("object");
				response.body.should.have.property("Sensor_ID");
				response.body.should.have.property("Current");
				response.body.should.have.property("Date");
				done();
			});
    	}, 1000);
	});

	//Now authenticated, try getting sensor value
	it("Getting Sensor: GET ./sensor_2", function(done) {
		this.timeout(1500);

    	setTimeout(function () {
      		supertest(app)
			.get("/sensor_2")
			.set("Authorization",token)
			.expect(200)
			.end(function(err, response) {
				if (err) {
					done(err);
				}
				response.body.should.be.a("object");
				response.body.should.have.property("Sensor_ID");
				response.body.should.have.property("Current");
				response.body.should.have.property("Date");
				done();
			});
    	}, 1000);
	});
});