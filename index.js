const aedes = require("aedes")();
const server = require("net").createServer(aedes.handle);
const port = process.env.PORT || 80;

server.listen(port, function () {
	console.log("server started and listening on port ", port);
});
