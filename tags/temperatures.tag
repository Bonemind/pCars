<temperatures>
	<div class="row">
		<div class="card blue-grey darken-1">
			<div class="card-content">
				<span class="card-title">
					Temperatures
				</span>
				<p>
					<b>Vehicle</b><br />
					Oil: { data.carState.mOilTempCelsius }&deg;C<br />
					Water: { data.carState.mWaterTempCelsius }&deg;C<br />

					<b>Brakes</b><br />
					Front left: { data.wheelData.mBrakeTempCelsius[tyreEnum.FRONT_LEFT] }&deg;C<br />
					Front Right: { data.wheelData.mBrakeTempCelsius[tyreEnum.FRONT_RIGHT] }&deg;C<br />
					Rear left: { data.wheelData.mBrakeTempCelsius[tyreEnum.REAR_LEFT] }&deg;C<br />
					Rear Right: { data.wheelData.mBrakeTempCelsius[tyreEnum.REAR_RIGHT] }&deg;C<br />
				</p>

			</div>
		</div>
	</div>
	<script>
		this.tyreEnum = {
			FRONT_LEFT: 0,
			FRONT_RIGHT: 1,
			REAR_LEFT: 2,
			REAR_RIGHT: 3
		}
		this.data = {}

		function onUpdate(data) {
			this.data.carState = data.carState;
			this.data.wheelData = data.wheelsAndTyres;
			this.update();
		}

		this.on("mount", function() {
			opts.provider.on("data-update", onUpdate.bind(this));
		});
	</script>
</temperatures>
