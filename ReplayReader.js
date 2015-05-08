var lowdb = require("lowdb");
var events = require("events");

function ReplayReader(replayFile) {
	this.replayFile = replayFile;
	this.db = lowdb(this.replayFile);
	this.data = this.db("datapoints").value();
	this.intervalTimer = 100;

	events.EventEmitter.call(this);
	self = this;
}

ReplayReader.prototype.__proto__ = events.EventEmitter.prototype;

//Actually reads data from the CREST api with a get request
ReplayReader.prototype.readData = function() {
	var currDatapoint = this.data.shift();
	console.log("EMITTER");
	console.log(currDatapoint);
	self.emit("data-update", currDatapoint);
}

//Schedules an intervaltimer to start polling
//If one is already running, this is a no-op
ReplayReader.prototype.startAutoPoll = function() {
	if (this.intervalTimer != undefined) {
		console.log("Intervaltimer already running");
		return;
	}
	this.intervalTimer = setInterval(function() {
		self.readData();
	}.bind(this), this.pollInterval);
}.bind(this);

//Stops the autopoller
//If none is running, this is a no-opt
ReplayReader.prototype.stopAutoPoll = function() {
	if (this.intervalTimer != undefined) {
		clearInterval(this.intervalTimer);
		this.intervalTimer = undefined;
		console.log("stopped");
	}
}.bind(this);
module.exports = ReplayReader;
