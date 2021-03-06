var fs = require("fs");
var lowdb = require("lowdb");
var CrestReader = require("./lib/CrestReader.js");
var ReplayReader = require("./lib/ReplayReader.js");
var RaceLogger = require("./lib/RaceLogger.js");
var TrackRecorder = require("./lib/TrackRecorder.js");

/* var crestReader = new CrestReader();
crestReader.on("data-update", processJson);
crestReader.startAutoPoll();*/

var crestReader = new CrestReader();
var raceLogger = new RaceLogger();
var trackRecorder = new TrackRecorder();
raceLogger.setDataProvider(crestReader);
trackRecorder.setDataProvider(crestReader);
crestReader.on("replay-done", function() {
	console.log("replay-done");
});
raceLogger.start();
trackRecorder.start();
crestReader.startAutoPoll();


