/*
passport.js

Written by: Jiawei Wu of ECE492 group 5
Date: 03/08/2017

Defines the passport strategy
more information: 
https://github.com/themikenicholson/passport-jwt
https://jonathanmh.com/express-passport-json-web-token-jwt-authentication-beginners/
*/
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
var User = require("./models/user_schema");
var config = require("./config");

module.exports = function(passport) {
	var params = {
		secretOrKey: config.secret,
		jwtFromRequest: ExtractJwt.fromAuthHeader()
	};
	passport.use(new JwtStrategy(params, function(jwt_payload, done) {
		User.findOne({id: jwt_payload.id}, function(err, user) {
			if (err) {
				return done(err, false);
			}
			if (user) {
				done(null, user);
			} 
			else {
				done(null, false);
			}
		});
	}));
};