<timings>
	<div class="row">
		<div class="card blue-grey darken-1">
			<div class="card-content">
				<span class="card-title">
					Timings
				</span>
				<p>
					<b>Current Lap: </b> <span if={ this.timings.mCurrentTime > -1 }>{ this.timings.mCurrentTime }</span><br />
					Best Lap: <span if={ this.timings.mBestLapTime > -1 }>{ this.timings.mBestLapTime }</span><br />
					Sector 1: <span if={ this.timings.mCurrentSector1Time > -1 }>{ this.timings.mCurrentSector1Time }</span><br />
					Sector 2: <span if={ this.timings.mCurrentSector2Time > -1 }>{ this.timings.mCurrentSector2Time }</span><br />
					Sector 3: <span if={ this.timings.mCurrentSector3Time > -1 }>{ this.timings.mCurrentSector3Time }</span><br />
				</p>

			</div>
		</div>
	</div>
	<script>
		this.timings = {}

		function onUpdate(data) {
			this.timings = data.timings;
			this.update();
		}

		this.on("mount", function() {
			opts.provider.on("data-update", onUpdate.bind(this));
		});
	</script>
</timings>
