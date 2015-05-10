<replay-viewer>
	<div class="row">
		<button class="waves-effect waves-light btn" onclick={ loadReplay }>Load Replay</button>
		<button class="waves-effect waves-light btn" onclick={ startReplay }>Start</button>
		<button class="waves-effect waves-light btn" onclick={ stopReplay }>Stop</button>
		<button class="waves-effect waves-light btn" onclick={ reloadReplay }>Reset</button>
	</div>
	<div class="row">
		<live-data provider={ replayReader }></live-data>
	</div>
	<script>
		//Requires
		var remote = require("remote");
		var Dialog = remote.require("dialog");
		var ReplayReader = require("./lib/ReplayReader.js");

		//Definitions
		this.replayReader = new ReplayReader();
		this.replayReader.loadDb("test.json");

		//Loads a replay
		this.loadReplay = function() {
			Dialog.showOpenDialog({ properties: ["openFile"] }, function(selectedFile) {
				if (selectedFile !== undefined) {
					this.replayReader.loadDb(selectedFile[0]);
				}
			}.bind(this));
		}

		this.startReplay = function() {
			this.replayReader.startAutoPoll();
		}
		this.stopReplay = function() {
			this.replayReader.stopAutoPoll();
		}
		this.reloadReplay = function() {
			this.replayReader.reload();
		}



	</script>
</replay-viewer>
