<position-board>
	<div class="card blue-grey darken-1">
		<div class="card-content">
			<span class="card-title">Positions</span>

			<ul class="collection">
				<li class="collection-item blue-grey {lighten-1: index == viewedParticipant, darken-2: index != parent.viewedParticipant }" each={ participant, index in participants }>
					<span>
						{ participant.mRacePosition } : { participant.mName } : { participant.mCurrentLapDistance }m
					</span>
				</li>
			</ul>
		</div>
	</div>
	<script>
		this.participants = [];
		this.viewedParticipant = -1;
		function onUpdate(data) {
			this.viewedParticipant = data.participants.mViewedParticipantIndex;
			this.participants = data.participants.mParticipantInfo;
			this.participants.sort(function(a, b) {
				return a.mRacePosition - b.mRacePosition;
			});
			this.update();
		};
		this.on("mount", function() {
			opts.provider.on("data-update", onUpdate.bind(this));
		});
	</script>
	
</position-board>
