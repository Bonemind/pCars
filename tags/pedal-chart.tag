<pedal-chart>
	<div class="row blue">
		<div id="chartelement" style="height: 200px; width: 100%;">
		</div>
	</div>

	</div>
	<script>
		this.time = 0.0;
		this.lineIndices = {
			Gas: 0,
			Brake: 1
		}

		this.data = {
			title: {
				text: "Gas and Brake"
			},
			legend: {
				horizontalAlign: "center",
				verticalAlign: "bottom"
			},
			data: [ 
				{
					type: "line",
					showInLegend: true,
					legendText: "Gas",
					dataPoints: [
					]
				},
				{
					type: "line",
					showInLegend: true,
					legendText: "Brake",
					dataPoints: [
					]
				}
			]
		}
		this.chart = new CanvasJS.Chart(this.chartelement, this.data);

		function onUpdate(data) {
			this.time += 0.1;
			this.chart.options.data[this.lineIndices.Gas].dataPoints.push({x: this.time, y: data.carState.mThrottle});
			this.chart.options.data[this.lineIndices.Brake].dataPoints.push({x: this.time, y: data.carState.mBrake});
			this.chart.render();

		}

		this.on("mount", function() {
			opts.provider.on("data-update", onUpdate.bind(this));
		});
	</script>
</pedal-chart>
