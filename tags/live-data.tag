<live-data>
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
			<position-board test="adsad" provider={ replayReader }></position-board>
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
