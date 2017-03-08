var mongoose = require("mongoose");
var bcrypt = require("bcrypt");

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