const aedes = require("aedes")();
const server = require("net").createServer(aedes.handle);
const port = process.env.PORT || 80;

server.listen(port, function () {
	console.log("server started and listening on port ", port);
});

aedes.on("publish", (packet, client) => {
	if (client) {
		console.log(
			`MQTT Client: ${client.id} has published message "${packet.payload}" on ${packet.topic}`
		);
	}
});
