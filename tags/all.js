riot.tag('live-data', '<h3>{ opts.test }</h3> <position-board test="adsad" provider="{ opts.dataProvider }"></position-board>', function(opts) {

		
	
});

riot.tag('participant-data', '', function(opts) {
	

});

riot.tag('position-board', '<ul> <li each="{ participants }"> { mRacePosition } : { mName } : { mCurrentLapDistance } </li> </ul>', function(opts) {
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
	
});
