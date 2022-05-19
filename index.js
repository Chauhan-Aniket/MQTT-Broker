const express = require("express");
const favicon = require("serve-favicon");
const path = require("path");

var app = express();
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

const aedes = require("aedes")();
const server = require("net").createServer(aedes.handle);
// const httpServer = require("http").createServer();
// const ws = require("websocket-stream");
const port = process.env.PORT || 1234;
// const wsPort = process.env.WSPORT || 80;

server.listen(port, function () {
	console.log("server started and listening on port ", port);
});

// ws.createServer({ server: httpServer }, aedes.handle);

// httpServer.listen(wsPort, function () {
// 	console.log("websocket server listening on port ", wsPort);
// });

aedes.on("publish", (packet, client) => {
	if (client) {
		console.log(
			`MQTT Client: ${client.id} has published message "${packet.payload}" on ${packet.topic}`
		);
	}
});
