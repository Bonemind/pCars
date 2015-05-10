<live-data>
	<div class="row">
		<div class="col s4">
			<timings provider={ replayReader }></timings>
		</div>
		<div class="col s4">
			<temperatures provider={ replayReader }></timings>
		</div>
		<div class="col s4">
			<pressures provider={ replayReader }></pressures>
		</div>
	</div>
	<div class="row">
		<div class="col s8">
			<div class="row">
				<pedal-chart provider={ replayReader }></pedal-chart>
			</div>
			<div class="row">
				<gear-chart provider={ replayReader }></gear-chart>
			</div>
			<div class="row">
				<speed-chart provider={ replayReader }></speed-chart>
			</div>
		</div>
		<div class="col s4">
			<div class="row">
				<position-board provider={ replayReader }></position-board>
			</div>
		</div>
	</div>
	<script>
		var ReplayReader = require("./lib/ReplayReader.js");
		this.replayReader = new ReplayReader("test.json");
		this.on("mount", function() {
			this.replayReader.startAutoPoll();
		});
		
	</script>
</live-data>
