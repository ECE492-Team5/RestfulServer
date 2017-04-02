$(function() {

	var $sensor_1_id = $("h2.sensor-1-ID");
	var $sensor_1_current = $("h3.sensor-1-current");
	var $sensor_1_date = $("h3.sensor-1-date");
	var $sensor_2_id = $("h2.sensor-2-ID");
	var $sensor_2_current = $("h3.sensor-2-current");
	var $sensor_2_date = $("h3.sensor-2-date");
	var $sensor_3_id = $("h2.sensor-3-ID");
	var $sensor_3_current = $("h3.sensor-3-current");
	var $sensor_3_date = $("h3.sensor-3-date");
	var $sensor_4_id = $("h2.sensor-4-ID");
	var $sensor_4_current = $("h3.sensor-4-current");
	var $sensor_4_date = $("h3.sensor-4-date");
	var $sensor_5_id = $("h2.sensor-5-ID");
	var $sensor_5_current = $("h3.sensor-5-current");
	var $sensor_5_date = $("h3.sensor-5-date");
	var $sensor_6_id = $("h2.sensor-6-ID");
	var $sensor_6_current = $("h3.sensor-6-current");
	var $sensor_6_date = $("h3.sensor-6-date");
	var $sensor_7_id = $("h2.sensor-7-ID");
	var $sensor_7_current = $("h3.sensor-7-current");
	var $sensor_7_date = $("h3.sensor-7-date");
	var $sensor_8_id = $("h2.sensor-8-ID");
	var $sensor_8_current = $("h3.sensor-8-current");
	var $sensor_8_date = $("h3.sensor-8-date");


	var $sensor_1_bar = $("#sensor-1-bar").text("");
	var $sensor_2_bar = $("#sensor-2-bar").text("");
	var $sensor_3_bar = $("#sensor-3-bar").text("");
	var $sensor_4_bar = $("#sensor-4-bar").text("");
	var $sensor_5_bar = $("#sensor-5-bar").text("");
	var $sensor_6_bar = $("#sensor-6-bar").text("");
	var $sensor_7_bar = $("#sensor-7-bar").text("");
	var $sensor_8_bar = $("#sensor-8-bar").text("");

	var toggle_interval;
	var toggle_on = false;
	$("#toggle").text("Idle");

	$("#toggle").on("click", function(event) {

		if (toggle_on) {
			toggle_on = false;
			clearInterval(toggle_interval);
			$("#toggle").text("Idle");
			$sensor_1_bar.css({
				"width": "0%"
			});
			$sensor_2_bar.css({
				"width": "0%"
			});
			$sensor_3_bar.css({
				"width": "0%"
			});
			$sensor_4_bar.css({
				"width": "0%"
			});
			$sensor_5_bar.css({
				"width": "0%"
			});
			$sensor_6_bar.css({
				"width": "0%"
			});
			$sensor_7_bar.css({
				"width": "0%"
			});
			$sensor_8_bar.css({
				"width": "0%"
			});
		}
		else {
			toggle_on = true;
			toggle_interval = setInterval(ajax_request, 1000);
			$("#toggle").text("Polling");
		}
	});

	function ajax_request() {
		console.log(localStorage.getItem("token"));
		var request1 = $.ajax({
			url: "/sensor_1",
			type: "GET",
			dataType: "json",
			beforeSend: function(request) {
   	 			request.setRequestHeader("Authorization", localStorage.getItem("token"));
  			},
  			error: function(err) {
  				throw err;
  			},
  			success: function(data) {
  				$sensor_1_id.text("Sensor ID: " + data.Sensor_ID).fadeTo(100, 1);
				$sensor_1_current.text("Sensor Value " + data.Current + data.Unit).fadeTo(100, 1);
				$sensor_1_date.text("Time Stamp: " + data.Date).fadeTo(100, 1);
	
				$sensor_1_bar.css({
					"width": Math.round((data.Current/1000)*100) + "%"
				});
  			}
		});

		var request2 = $.ajax({
			url: "/sensor_2",
			type: "GET",
			dataType: "json",
			beforeSend: function(request) {
   	 			request.setRequestHeader("Authorization", localStorage.getItem("token"));
  			},
  			error: function(err) {
  				throw err;
  			},
  			success: function(data) {
  				$sensor_2_id.text("Sensor ID: " + data.Sensor_ID).fadeTo(100, 1);
				$sensor_2_current.text("Sensor Value " + data.Current + data.Unit).fadeTo(100, 1);
				$sensor_2_date.text("Time Stamp: " + data.Date).fadeTo(100, 1);
	
				$sensor_2_bar.css({
					"width": Math.round((data.Current/1200)*100) + "%"
				});
  			}
		});

		var request3 = $.ajax({
			url: "/sensor_3",
			type: "GET",
			dataType: "json",
			beforeSend: function(request) {
   	 			request.setRequestHeader("Authorization", localStorage.getItem("token"));
  			},
  			error: function(err) {
  				throw err;
  			},
  			success: function(data) {
  				$sensor_3_id.text("Sensor ID: " + data.Sensor_ID).fadeTo(100, 1);
				$sensor_3_current.text("Sensor Value " + data.Current + data.Unit).fadeTo(100, 1);
				$sensor_3_date.text("Time Stamp: " + data.Date).fadeTo(100, 1);
	
				$sensor_3_bar.css({
					"width": Math.round((data.Current/1200)*100) + "%"
				});
  			}
		});

		var request4 = $.ajax({
			url: "/sensor_4",
			type: "GET",
			dataType: "json",
			beforeSend: function(request) {
   	 			request.setRequestHeader("Authorization", localStorage.getItem("token"));
  			},
  			error: function(err) {
  				throw err;
  			},
  			success: function(data) {
  				$sensor_4_id.text("Sensor ID: " + data.Sensor_ID).fadeTo(100, 1);
				$sensor_4_current.text("Sensor Value " + data.Current + data.Unit).fadeTo(100, 1);
				$sensor_4_date.text("Time Stamp: " + data.Date).fadeTo(100, 1);
	
				$sensor_4_bar.css({
					"width": Math.round((data.Current/1600)*100) + "%"
				});
  			}
		});

		var request5 = $.ajax({
			url: "/sensor_5",
			type: "GET",
			dataType: "json",
			beforeSend: function(request) {
   	 			request.setRequestHeader("Authorization", localStorage.getItem("token"));
  			},
  			error: function(err) {
  				throw err;
  			},
  			success: function(data) {
  				$sensor_5_id.text("Sensor ID: " + data.Sensor_ID).fadeTo(100, 1);
				$sensor_5_current.text("Sensor Value " + data.Current + data.Unit).fadeTo(100, 1);
				$sensor_5_date.text("Time Stamp: " + data.Date).fadeTo(100, 1);
	
				$sensor_5_bar.css({
					"width": Math.round((data.Current/1500)*100) + "%"
				});
  			}
		});

		var request6 = $.ajax({
			url: "/sensor_6",
			type: "GET",
			dataType: "json",
			beforeSend: function(request) {
   	 			request.setRequestHeader("Authorization", localStorage.getItem("token"));
  			},
  			error: function(err) {
  				throw err;
  			},
  			success: function(data) {
  				$sensor_6_id.text("Sensor ID: " + data.Sensor_ID).fadeTo(100, 1);
				$sensor_6_current.text("Sensor Value " + data.Current + data.Unit).fadeTo(100, 1);
				$sensor_6_date.text("Time Stamp: " + data.Date).fadeTo(100, 1);
	
				$sensor_6_bar.css({
					"width": Math.round((data.Current/1500)*100) + "%"
				});
  			}
		});

		var request7 = $.ajax({
			url: "/sensor_7",
			type: "GET",
			dataType: "json",
			beforeSend: function(request) {
   	 			request.setRequestHeader("Authorization", localStorage.getItem("token"));
  			},
  			error: function(err) {
  				throw err;
  			},
  			success: function(data) {
  				$sensor_7_id.text("Sensor ID: " + data.Sensor_ID).fadeTo(100, 1);
				$sensor_7_current.text("Sensor Value " + data.Current + data.Unit).fadeTo(100, 1);
				$sensor_7_date.text("Time Stamp: " + data.Date).fadeTo(100, 1);
	
				$sensor_7_bar.css({
					"width": Math.round((data.Current/1500)*100) + "%"
				});
  			}
		});

		var request8 = $.ajax({
			url: "/sensor_8",
			type: "GET",
			dataType: "json",
			beforeSend: function(request) {
   	 			request.setRequestHeader("Authorization", localStorage.getItem("token"));
  			},
  			error: function(err) {
  				throw err;
  			},
  			success: function(data) {
  				$sensor_8_id.text("Sensor ID: " + data.Sensor_ID).fadeTo(100, 1);
				$sensor_8_current.text("Sensor Value " + data.Current + data.Unit).fadeTo(100, 1);
				$sensor_8_date.text("Time Stamp: " + data.Date).fadeTo(100, 1);
	
				$sensor_8_bar.css({
					"width": Math.round((data.Current/1500)*100) + "%"
				});
  			}
		});














	}
});
