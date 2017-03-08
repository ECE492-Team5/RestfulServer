$(function() {

	var $sensor_1_id = $("h2.sensor-1-ID");
	var $sensor_1_current = $("h2.sensor-1-current");
	var $sensor_1_date = $("h2.sensor-1-date");
	var $sensor_2_id = $("h2.sensor-2-ID");
	var $sensor_2_current = $("h2.sensor-2-current");
	var $sensor_2_date = $("h2.sensor-2-date");

	var $("#toggle").on("click", function(event) {
		console.log("CLIKC!!");
		var request1 = $.ajax({
			url: "/sensor_1",
			dataType: "json"
		});

		var request2 = $.ajax({
			url: "/sensor_2",
			dataType: "json"
		});

		request1.done(function(data) {
			$sensor_1_id = data.Device_ID;
		})

	});
});