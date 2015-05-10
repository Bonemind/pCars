<pressures>
	<div class="row">
		<div class="card blue-grey darken-1">
			<div class="card-content">
				<span class="card-title">
					Pressures
				</span>
				<p>
					Water: { carState.mWaterPressureKPa } KPa<br />
					Fuel: { carState.mFuelPressureKPa } KPa<br />
				</p>

			</div>
		</div>
	</div>
	<script>
		this.carState = {}

		function onUpdate(data) {
			this.carState = data.carState;
			this.update();
		}

		this.on("mount", function() {
			opts.provider.on("data-update", onUpdate.bind(this));
		});
	</script>
</pressures>
