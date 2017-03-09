/*
user_unit_test.js

Written by: Jiawei Wu of ECE492 group 5
Date: 03/08/2017

Unit testing for the server, uses Chai and Mocha testing packages

This unit test tests database functionalities like account creation, 
database schemas, password salting, and saving and deleting from database

Help taken from: 
https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai
http://mherman.org/blog/2015/09/10/testing-node-js-with-mocha-and-chai/
*/

/********************************
Importing all necessary packages
********************************/
var mongoose = require("mongoose");
var User = require("../models/user_schema");
var app = require("../app");
var chai = require("chai");
var should = chai.should();

//Starting user and database test
describe("Testing User and Database", function() {

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

	//Checks if user object has the correct properties
	it("User Has Username and Password Property", function(done) {
		var user = new User({
							  username : "test_user_1",
					  		  password : "test_password"
						});

		user.should.be.a("object");
		user.should.have.property("username");
		user.should.have.property("password");
		done();
	});

	//Checks if user object has the correct properties
	it("User Username and Password Name Match Input", function(done) {
		var user = new User({
							  username : "test_user_1",
					  		  password : "test_password"
						});
		user.username.should.equal("test_user_1");
		user.password.should.equal("test_password");
		done();
	});

	//Starting Database tests
	describe("Saving Users", function() {
		it("Add A User", function(done) {
			var user = new User({
							  username : "test_user_1",
					  		  password : "test_password"
						});
			user.save(done);
		});
		//Try to find user
		it("Should Return Number of Entries: 1", function(done) {
			User.find({}, function(err, entry) {
				if(err) {
					done(err);
				}
				else {
					entry.should.have.length(1);
					done();
				}
			});
		});
		//Try to add user
		it("Add Another User", function(done) {
			var user = new User({
							  username : "test_user_2",
					  		  password : "test_password"
						});
			user.save(done);
		});

		it("Should Return Number of Entries: 2", function(done) {
			User.find({}, function(err, entry) {
				if(err) {
					done(err);
				}
				else {
					entry.should.have.length(2);
					done();
				}
			});
		});
	});
	//Starting more database tests
	describe("Getting And Removing Users", function() {
		//Try accessing user in database
		it("User 1 Exists and Username And Password are Correct", function(done) {
			User.findOne({username : "test_user_1"}, function(err, entry) {
				if(err) {
					done(err);
				}
				else {
					entry.should.have.property("username").equal("test_user_1");
					entry.checkPassword("test_password", function(err, isMatch) {
						if(isMatch) {
							done();
						}
						else {
							done(err);
						}
					});
				}
			});
		});
		//Try accessing user in database
		it("User 2 Exists and Username And Password are Correct", function(done) {
			User.findOne({username : "test_user_2"}, function(err, entry) {
				if(err) {
					done(err);
				}
				else {
					entry.should.have.property("username").equal("test_user_2");
					entry.checkPassword("test_password", function(err, isMatch) {
						if(isMatch) {
							done();
						}
						else {
							done(err);
						}
					});
				}
			});
		});
	});
});
