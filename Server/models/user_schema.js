/*
user_schema.js

Written by: Jiawei Wu of ECE492 group 5
Date: 03/04/2017

Defines the user schema to allow storage 
into the mongodb database

Also salts the passwords so no plain-text is stored
*/
var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

var SALT_FACTOR = 10;
var Schema = mongoose.Schema;

var userSchema = new Schema({
	username: { type: String, required: true },
	password: { type: String, required: true }
});

userSchema.pre("save", function (done) {
	var user = this;
	if (this.isModified("password")) {
		bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
			if (err) {
				return done(err);
			}
			bcrypt.hash(user.password, salt, function(err, hash) {
				if (err) {
					return done(err);
				}
				user.password = hash;
				done();
			});
		});
	} else {
		return done();
	}
});

userSchema.methods.checkPassword = function(guess, done) {
	bcrypt.compare(guess, this.password, function(err, isMatch) {
		done(err, isMatch);
	});
};

var User = mongoose.model("User", userSchema);

module.exports = User;
