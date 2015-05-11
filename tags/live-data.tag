<live-data>
	<div class="row">
		<div class="col s3">
			<general-info provider={ provider }></general-info>
		</div>
		<div class="col s3">
			<timings provider={ provider }></timings>
		</div>
		<div class="col s3">
			<temperatures provider={ provider }></timings>
		</div>
		<div class="col s3">
			<pressures provider={ provider }></pressures>
		</div>
	</div>
	<div class="row">
		<div class="col s8">
			<div class="row">
				<pedal-chart provider={ provider }></pedal-chart>
			</div>
			<div class="row">
				<gear-chart provider={ provider }></gear-chart>
			</div>
			<div class="row">
				<rpm-chart provider={ provider }></rpm-chart>
			</div>
		</div>
		<div class="col s4">
			<div class="row">
				<position-board provider={ provider }></position-board>
			</div>
		</div>
	</div>
	<script>
		this.provider = opts.provider;
		this.on("unmount", function() {
			this.provider.removeAllListeners();
		}.bind(this));
	</script>
</live-data>
