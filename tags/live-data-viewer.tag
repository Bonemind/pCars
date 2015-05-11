<live-data-viewer>
	<div class="row">
		<div class="col s3">
			<input type="text" onkeyup={ urlChange } name="crestUrl" />
		</div>
		<div class="col s4">
			<button class="waves-effect waves-light btn" onclick={ onStart }>Start Updating</button>
			<button class="waves-effect waves-light btn" onclick={ onStop }>Stop Updating</button>
		</div>
		<div class="col s3">
			<div class="switch">
				Recording:
				<label>
					Off
					<input name="recordingEnabled" onchange={ recordingToggle } class="type" type="checkbox">
					<span class="lever"></span>
					On
				</label>
			</div>
		</div>
	</div>
	<div class="row">
		<live-data provider={ crestReader }></live-data>
	</div>
	<script>
		//Requires
		var remote = require("remote");
		var Dialog = remote.require("dialog");
		var CrestReader = require("./lib/CrestReader.js");
		var RaceLogger = require("./lib/RaceLogger.js");
		this.crestUrl.value = "http://localhost:8080/crest/v1/api";

		//Definitions
		this.crestReader = new CrestReader();
		this.raceLogger = new RaceLogger();
		this.raceLogger.setDataProvider(this.crestReader);

		//Loads a replay
		this.urlChange = function() {
			console.log(this.crestUrl.value);
		}

		this.onStart = function() {
			this.crestReader.startAutoPoll();
		}

		this.onStop = function() {
			this.crestReader.stopAutoPoll();
		}

		this.recordingToggle = function() {
			if (this.recordingEnabled.checked) {
				this.raceLogger.start();
			} else if (!this.recordingEnabled.checked) {
				this.raceLogger.stop();
			}
		}

	</script>
</live-data-viewer>
