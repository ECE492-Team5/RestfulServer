$(function() {


	var signInButton = $(".signin-button");
	var signUpButton = $(".signup-button");
	var usernameField = $("#username");
	var passwordField = $("#password");
	var alert = $(".signin-error");
	var success = $(".signup-success");
	alert.hide();
	success.hide();

	signInButton.on("click", function(event) {

		if (usernameField.val() && passwordField.val()) {
			console.log("sending Request");
			$.ajax({
				url: "/signin",
				type: "POST",
				data: {
					"username": usernameField.val(),
				    "password": passwordField.val()
				  	},
				dataType: "json",
				error: function(err) {
					alert.show().html("<strong>Error</strong> Incorrect Username or Password");
				},
				success: function(data) {
					if (data.status === "AuthFailed") {
						alert.show().html("<strong>Error</strong> Incorrect Username or Password");
					}
					else {
						alert.hide();
						localStorage.setItem("token", data.message);
						localStorage.setItem("tempToken", data.tempToken);
						window.location.href = "/index/" + usernameField.val() + "/" + data.tempToken.replace(/[^a-zA-Z ]/g, "");
					}
				}
			});
		} else {
			alert.show().html("<strong>Error</strong> Username or Password Empty");
		}
	});

	signUpButton.on("click", function(event) {

		if (usernameField.val() && passwordField.val()) {
			console.log("sending Request");
			$.ajax({
				url: "/signup",
				type: "POST",
				data: {
					"username": usernameField.val(),
				    "password": passwordField.val()
				  	},
				dataType: "json",
				error: function(err) {
					alert.show().html("<strong>Error</strong> Incorrect Username or Password");
				},
				success: function(data) {
					if (data.status === "UserCreateError") {
						alert.show().html("<strong>Error</strong> Incorrect Username or Password or User Already Exist");
					}
					else {
						alert.hide();
						success.show();
					}
				}
			});
		} else {
			alert.show().html("<strong>Error</strong> Username or Password Empty");
		}
	});
});