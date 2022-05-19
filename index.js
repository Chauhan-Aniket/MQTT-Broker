// MQTT broker
var mosca = require("mosca");
require("dotenv").config();

var pubsubsettings = {
	//using ascoltatore
	type: "mongo",
	url: `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@${process.env.APP_URL}:27017/${process.env.CLUSTER_NAME}`,
	pubsubCollection: "ascoltatori",
	mongo: {},
};

var settings = {
	port: process.env.PORT || 1883, //mosca (mqtt) port
	host: "my-mqttbroker.herokuapp.com" || "127.0.0.1",
	backend: pubsubsettings, //pubsubsettings is the object we created above
};

var server = new mosca.Server(settings);

server.on("clientConnected", function (client) {
	console.log("client connected", client.id);
});

// fired when a message is received
server.on("published", function (packet, client) {
	console.log("Published", packet.payload);
});

server.on("ready", setup);

// fired when the mqtt server is ready
function setup() {
	console.log("Mosca server is up and running");
}
