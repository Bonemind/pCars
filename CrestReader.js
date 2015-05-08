var events = require("events");
var http = require("http");
var util = require("util");
var _ = require("lodash");

//CrestReader class, reads data from the CREST tool
//Emits a data-update event when CREST data was parsed
function CrestReader(config) {
	this.url = "http://localhost:8080/crest/v1/api";
	this.pollInterval = 100;

	if (config) {
		for (var prop in config) {
			if (this.hasOwnProperty(prop)) {
				this[prop] = config[prop];
				console.log(this[prop]);
			}
		}
	}

	events.EventEmitter.call(this);
	this.intervalTimer = undefined;
	_.bindAll(this);
}

util.inherits(CrestReader, events.EventEmitter);

//Actually reads data from the CREST api with a get request
CrestReader.prototype.readData = function() {
	http.get(this.url, function(res) {
		res.setEncoding("utf8");
		var data = "";
		res.on("data", function(chunk) {
			//Try to parse json, if this fails, return
			data += chunk;
		});
		res.on("end", function() {
			try {
				JSON.parse(data);
				this.emit("data-update", data);
			} catch(err) {
				
				console.log("Json parse error, skipping datapoint");
				return;
			}
		});
	});
};

//Schedules an intervaltimer to start polling
//If one is already running, this is a no-op
CrestReader.prototype.startAutoPoll = function() {
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
CrestReader.prototype.stopAutoPoll = function() {
	if (this.intervalTimer != undefined) {
		clearInterval(this.intervalTimer);
		this.intervalTimer = undefined;
		console.log("stopped");
	}
};
module.exports = CrestReader;
