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