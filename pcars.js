var fs = require("fs");
var lowdb = require("lowdb");
var CrestReader = require("./CrestReader.js");
var ReplayReader = require("./ReplayReader.js");
var RaceLogger = require("./RaceLogger.js");

/* var crestReader = new CrestReader();
crestReader.on("data-update", processJson);
crestReader.startAutoPoll();*/

var replayReader = new ReplayReader("test.json");
var raceLogger = new RaceLogger();
raceLogger.setDataProvider(replayReader);
replayReader.on("replay-done", function() {
	console.log("replay-done");
});
raceLogger.start();
replayReader.startAutoPoll();


