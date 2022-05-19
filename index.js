const favicon = require("serve-favicon");
const path = require("path");

const aedes = require("aedes")();
const httpServer = require("http").createServer();
const ws = require("websocket-stream");
const port = process.env.PORT || 1234;

ws.createServer({ server: httpServer }, aedes.handle);
httpServer.use(favicon(path.join(__dirname, "public", "favicon.ico")));
httpServer.listen(port, function () {
	console.log("websocket server listening on port ", port);
});

aedes.on("publish", (packet, client) => {
	if (client) {
		console.log(
			`MQTT Client: ${client.id} has published message "${packet.payload}" on ${packet.topic}`
		);
	}
});
