var http = require("http");
var fs = require("fs");
var inRace = false;
var raceData = {
	carName: "",
	trackName: "",
	startTime: "",
	folderName: ""
}
function readAndWrite() {
	http.get("http://localhost:8080/crest/v1/api", function(res) {
		res.setEncoding("utf8");
		var data = "";
		res.on("data", function(chunk) {
			//Try to parse json, if this fails, return
			data += chunk;
		});
		res.on("end", function() {
			processJson(data);
		});
	});
}

function processJson(data) {
	try {
		var parsed = JSON.parse(data);
	} catch (err) {
		console.log("Json parse error, skipping datapoint");
		return;
	}

	//If we aren't in a race, cleanup data and return
	try {
		if (parsed.gameStates.mGameState < 2) {
			raceData.trackName = "";
			raceData.carName = "";
			raceData.startTime = "";
			raceData.folderName = "";
			inRace = false;
			return;
		//If we are, and we weren't before, get relevant properties and create a folder
		} else if (parsed.gameStates.mGameState >= 2 && !inRace) {
			raceData.carName = parsed.vehicleInformation.mCarName;
			raceData.trackName = parsed.eventInformation.mTrackLocation;
			raceData.startTime = new Date().toISOString();
			raceData.folderName = raceData.startTime.replace(/:/g, "-") + " - " + raceData.trackName + " - " + raceData.carName;
			fs.mkdirSync(__dirname + "/" + raceData.folderName);
			inRace = true;
		}
	} catch (err) {
		console.log("Game is propably not running");
		return;
	}

	//Write data
	var timestamp = new Date().getTime();
	fs.writeFile(__dirname + "/logs/" + raceData.folderName + "/" + timestamp, data, function(err) {
		if (err) {
			console.log(err);
		}
	});
}

setInterval(function() {
	readAndWrite();
}, 33);
