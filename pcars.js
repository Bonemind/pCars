var http = require("http");
var fs = require("fs");
var lowdb = require("lowdb");
var CrestReader = require("./CrestReader.js");
var inRace = false;
var currentDb = undefined;
var raceData = {
	carName: "",
	trackName: "",
	startTime: "",
	folderName: ""
}

function processJson(data) {
	//If we aren't in a race, cleanup data and return
	try {
		if (data.gameStates.mGameState < 2) {
			if (currentDb !== undefined) {
				currentDb.saveSync();
				currentDb = undefined;
			}
			raceData.trackName = "";
			raceData.carName = "";
			raceData.startTime = "";
			raceData.folderName = "";
			inRace = false;
			return;
		//If we are, and we weren't before, get relevant properties and create a folder
		} else if (data.gameStates.mGameState >= 2 && !inRace) {
			raceData.carName = data.vehicleInformation.mCarName;
			raceData.trackName = data.eventInformation.mTrackLocation;
			raceData.startTime = new Date().toISOString();
			raceData.folderName = raceData.startTime.replace(/:/g, "-") + " - " + raceData.trackName + " - " + raceData.carName;
			currentDb = lowdb(__dirname + "/logs/" + raceData.folderName + ".json", {
				autosave: false
			});
			console.log("Race start detected: " + raceData.trackName + " " + raceData.carName);
			inRace = true;
		}
	} catch (err) {
		console.log(err);
		console.log("Game is propably not running");
		return;
	}
	var currentParticipant = data.participants.mViewedParticipantIndex;
	if (currentParticipant < 0) {
		return;
	}
	data.eventInformation.currentLap = data.participants.mParticipantInfo[currentParticipant].mCurrentLap;
	currentDb("datapoints").push(data);
}

try {
	fs.mkdirSync(__dirname + "/logs");
} catch (err) {
	if (err.code != "EEXIST") {
		console.log(err);
		return;
	}
	//Logs folder exists, no need to create one
}

var crestReader = new CrestReader();
crestReader.on("data-update", processJson);
crestReader.startAutoPoll();


