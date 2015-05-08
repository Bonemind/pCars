"use strict";
var lowdb = require("lowdb");
var events = require("events");
var util = require("util");
var _ = require("lodash");

function ReplayReader(replayFile) {
	this.replayFile = replayFile;
	this.db = lowdb(this.replayFile);
	this.data = this.db("datapoints").value();
	this.intervalTimer = undefined;
	this.pollInterval = 100;

	events.EventEmitter.call(this);
	_.bindAll(this);
}
util.inherits(ReplayReader, events.EventEmitter);

//Actually reads data from the CREST api with a get request
ReplayReader.prototype.readData = function() {
	var currDatapoint = this.data.shift();
	this.emit("data-update", currDatapoint);
	console.log(this.data.length);
	if (this.data.length < 3150) {
		this.stopAutoPoll();
		this.emit("replay-done");
	}
};

//Schedules an intervaltimer to start polling
//If one is already running, this is a no-op
ReplayReader.prototype.startAutoPoll = function() {
	if (this.intervalTimer != undefined) {
		console.log("Intervaltimer already running");
		return;
	}
	this.intervalTimer = setInterval(function() {
		this.readData();
	}.bind(this), this.pollInterval);
};

//Stops the autopoller
//If none is running, this is a no-opt
ReplayReader.prototype.stopAutoPoll = function() {
	if (this.intervalTimer != undefined) {
		clearInterval(this.intervalTimer);
		this.intervalTimer = undefined;
		console.log("stopped");
	}
};
module.exports = ReplayReader;
