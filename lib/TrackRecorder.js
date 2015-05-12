"use strict";
var fs = require("fs");
var _ = require("lodash");
var lowdb = require("lowdb");

function RaceLogger(dataFolder) {
	this.inRace = false;
	this.currentDb = null;
	this.dataFolder = __dirname + "/tracks";
	this.raceData = {
		carName: "",
		trackName: "",
		startTime: "",
		fileName: ""
	}
	this.raceDataProvider = null;
	if (dataFolder) {
		this.dataFolder = dataFolder;
	}
	try {
		fs.mkdirSync(this.dataFolder);
	} catch (err) {
		if (err.code != "EEXIST") {
			console.log(err);
			return;
		}
		//Logs folder exists, no need to create one
	}
	_.bindAll(this);
	this.running = false;
	this.currentLapDistance = 0;
}

RaceLogger.prototype.processRaceData = function(data) {
	if (data.buildinfo == undefined) {
		// console.log("Game is propably not running");
		return;
	}

	if (currentParticipant < 0) {
		return;
	}

	//If we aren't in a race, cleanup data and return
	if (data.gameStates.mGameState < 2) {
		this.raceCompleted();
		return;
	//If we are, and we weren't before, get relevant properties and create a folder
	} else if (data.gameStates.mGameState >= 2 && !this.inRace) {
		this.raceData.trackName = data.eventInformation.mTrackLocation;
		this.raceData.carName = data.vehicleInformation.mCarName;
		this.raceData.startTime = new Date().toISOString();
		this.raceData.fileName = this.raceData.startTime.replace(/:/g, "-") + " - " + this.raceData.trackName;
		this.currentDb = lowdb(this.dataFolder + "/" + this.raceData.fileName + ".json", {
			autosave: false
		});
		console.log("Race start detected: " + this.raceData.trackName + " " + this.raceData.carName);
		this.inRace = true;
	}
	var currentParticipant = data.participants.mViewedParticipantIndex;
	if (currentParticipant < 0) {
		return;
	}
	//Check if we are at the start of a lap and don't have a distance yet
	//If this is false, then don't start logging yet
	if (!(this.currentLapDistance > 0 && this.currentLapDistance) < 5 && this.currentLapDistance == 0) {
		return;
	}
	if (data.participants.mParticipantInfo[currentParticipant].mCurrentLap > this.currentLapDistance) {
		this.raceCompleted();
	}

	this.currentLapDistance = data.participants.mParticipantInfo[currentParticipant].mCurrentLapDistance;
	data.eventInformation.currentLap = data.participants.mParticipantInfo[currentParticipant].mCurrentLap;
	var currentLapData = {};
	currentLapData.mWorldPosition = data.participants.mParticipantInfo[currentParticipant].mWorldPosition;
	currentLapData.mCurrentLapDistance = data.participants.mParticipantInfo[currentParticipant].mCurrentLapDistance;
	this.currentDb("datapoints").push(data);
};

RaceLogger.prototype.raceCompleted = function() {
	if (this.currentDb !== null) {
		this.currentDb.saveSync();
		this.currentDb = null;
	}
	this.raceData.trackName = "";
	this.raceData.carName = "";
	this.raceData.startTime = "";
	this.raceData.fileName = "";
	this.inRace = false;
};

RaceLogger.prototype.setDataProvider = function(provider) {
	this.raceDataProvider = provider;
};

RaceLogger.prototype.start = function() {
	if (this.running) {
		return;
	}
	if (!this.raceDataProvider) {
		return;
	}
	this.raceDataProvider.on("data-update", this.processRaceData);
	this.raceDataProvider.on("replay-done", this.raceCompleted);
	this.running = true;
};

RaceLogger.prototype.stop = function() {
	this.raceDataProvider.removeListener("data-update", this.processRaceData);
	this.raceDataProvider.removeListener("replay-done", this.raceCompleted);
	this.currentDb = null;
	this.raceCompleted();
}

module.exports = RaceLogger;


