<general-info>
	<div class="row">
		<div class="card blue-grey darken-1">
			<div class="card-content">
				<span class="card-title">
					Race info
				</span>
				<p>
					<b>Car</b><br />
					Car: { vehicleInformation.mCarName } <br />
					Class: { vehicleInformation.mCarClassName }<br />
					<b>Track</b><br />
					Laps: { eventInformation.currentLap } / { eventInformation.mLapsInEvent } <br />
					Track: { eventInformation.mTrackLocation } - { eventInformation.mTrackVariation } <br />
					Length: { eventInformation.mTrackLength }m <br />
				</p>

			</div>
		</div>
	</div>
	<script>
		this.vehicleInformation = {};
		this.eventInformation = {};

		function onUpdate(data) {
			this.vehicleInformation = data.vehicleInformation;
			this.eventInformation = data.eventInformation;
			this.update();
		}

		this.on("mount", function() {
			opts.provider.on("data-update", onUpdate.bind(this));
		});
	</script>
</general-info>
