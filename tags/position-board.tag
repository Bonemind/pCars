<position-board>

	<ul class="collection">
		<li class="collection-item teal {darken-1: index == viewedParticipant, darken-4: index != parent.viewedParticipant }" each={ participant, index in participants }>
			<span>
				{ participant.mRacePosition } : { participant.mName } : { participant.mCurrentLapDistance }m
			</span>
		</li>
	</ul>
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
