var mongoose = require("mongoose");
var User = require("../models/user_schema");
var chai = require("chai");
var app = require("../app");
var should = chai.should();


describe("Adding Users", function() {
		var user1;
		user1 = new User({username : "test_user_1",
					      password : "test_password"
					  });

		it("Has a username property", function() {
			user1.should.be.a("object");
			user1.should.have.property("username");
			user1.should.have.property("password");
			user1.username.should.equal("test_user_1");
			user1.password.should.equal("test_password");
		});
});
