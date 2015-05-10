"use strict";
var lowdb = require("lowdb");
var events = require("events");
var util = require("util");
var _ = require("lodash");

function ReplayReader(replayFile) {
	this.replayFile = undefined;
	this.db = undefined;
	this.data = [];
	this.intervalTimer = undefined;
	this.dataIndex = 0;

	if (replayFile) {
		this.loadDb(replayFile);
	}
	this.pollInterval = 100;

	events.EventEmitter.call(this);
	_.bindAll(this);
}
util.inherits(ReplayReader, events.EventEmitter);

//Loads a new replay database
ReplayReader.prototype.loadDb = function(db) {
	this.dataIndex = 0;
	if (this.intervalTimer != undefined) {
		clearInterval(this.intervalTimer);
	}
	this.replayFile = db;
	this.db = lowdb(this.replayFile);
	this.data = [];
	this.intervalTimer = undefined;
}

//Actually reads data from the CREST api with a get request
ReplayReader.prototype.readData = function() {
	var currDatapoint = this.data[this.dataIndex];
	this.emit("data-update", currDatapoint);
	this.dataIndex++;
	// console.log(this.data.length);
	if (this.dataIndex >= this.data.length) {
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
	if (this.replayFile == null) {
		console.log("No database loaded");
		return;
	}
	if (this.data.length == 0) {
		this.data = this.db("datapoints").value();
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

//Reload the current dataset
//Wrapper around this.loadDb, we reload the whole db
ReplayReader.prototype.reload = function() {
	if (this.replayFile === undefined) {
		console.log("No replay file set");
	}
	this.emit("data-reset");
	this.stopAutoPoll();
	this.dataIndex = 0;
}
module.exports = ReplayReader;
