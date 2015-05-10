<live-data>
	<div class="row">
		<div class="col s4">
			<timings provider={ provider }></timings>
		</div>
		<div class="col s4">
			<temperatures provider={ provider }></timings>
		</div>
		<div class="col s4">
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
				<speed-chart provider={ provider }></speed-chart>
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
		this.on("mount", function() {
			//this.provider.startAutoPoll();
		});
		
	</script>
</live-data>
