<gear-chart>
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
				text: "Gears"
			},
			axisY: {
				minimum: 0
			},
			data: [ 
				{
					type: "stepLine",
					dataPoints: [
					]
				}
			]
		}
		this.chart = new CanvasJS.Chart(this.chartelement, this.data);

		function onUpdate(data) {
			this.time += 0.1;
			this.chart.options.data[0].dataPoints.push({x: this.time, y: data.carState.mGear});
			this.chart.options.axisY.maximum = data.carState.mNumGears;
			this.chart.render();
		}

		this.on("mount", function() {
			opts.provider.on("data-update", onUpdate.bind(this));
		});
	</script>
</gear-chart>
