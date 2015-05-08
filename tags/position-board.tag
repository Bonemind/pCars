<position-board>

	<ul>
		<li each={ participants }>
			{ mRacePosition } : { mName } : { mCurrentLapDistance } 
		</li>
	</ul>
	<script>
		this.participants = [];
		var self = this;
		function onUpdate(data) {
			this.participants = data.participants.mParticipantInfo;
			this.participants.sort(function(a, b) {
				return a.mRacePosition - b.mRacePosition;
			});
			this.update();
		};
		opts.provider.on("data-update", onUpdate.bind(this));
	</script>
	
</position-board>
