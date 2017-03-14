$(function() {

	var $sensor_1_id = $("h2.sensor-1-ID");
	var $sensor_1_current = $("h3.sensor-1-current");
	var $sensor_1_date = $("h3.sensor-1-date");
	var $sensor_2_id = $("h2.sensor-2-ID");
	var $sensor_2_current = $("h3.sensor-2-current");
	var $sensor_2_date = $("h3.sensor-2-date");

	var $sensor_1_bar = $("#sensor-1-bar").text("");
	var $sensor_2_bar = $("#sensor-2-bar").text("");

	var toggle_interval;
	var toggle_on = false;
	$("#toggle").text("Idle");

	$("#toggle").on("click", function(event) {

		$sensor_1_id.fadeTo(100, 0.5);
		$sensor_1_current.fadeTo(100, 0.5);
		$sensor_1_date.fadeTo(100, 0.5);
		$sensor_2_id.fadeTo(100, 0.5);
		$sensor_2_current.fadeTo(100, 0.5);
		$sensor_2_date.fadeTo(100, 0.5);

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
		}
		else {
			toggle_on = true;
			toggle_interval = setInterval(ajax_request, 1000);
			$("#toggle").text("Polling");
		}
	});

	function ajax_request() {

		var request1 = $.ajax({
			url: "/sensor_1",
			dataType: "json"
		});

		var request2 = $.ajax({
			url: "/sensor_2",
			dataType: "json"
		});

		request1.done(function(data) {

			$sensor_1_id.text("Sensor ID: " + data.Sensor_ID).fadeTo(100, 1);
			$sensor_1_current.text("Current Amps: " + data.Current + "A").fadeTo(100, 1);
			$sensor_1_date.text("Time Stamp: " + data.Date).fadeTo(100, 1);
	
			$sensor_1_bar.css({
				"width": Math.round((data.Current/15)*100) + "%"
			});

		});

		request2.done(function(data) {

			$sensor_2_id.text("Sensor ID: " + data.Sensor_ID).fadeTo(100, 1);
			$sensor_2_current.text("Current Amps: " + data.Current + "A").fadeTo(100, 1);
			$sensor_2_date.text("Time Stamp: " + data.Date).fadeTo(100, 1);

			$sensor_2_bar.css({
				"width": Math.round((data.Current/15)*100) + "%"
			});
		});
	}
});