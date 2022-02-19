const express = require("express");
const mongoose = require("mongoose");

const url_online =
	"mongodb+srv://giddy:EgFNt3LRl9olFnbn@cluster0.7rupp.mongodb.net/changestreamDB?retryWrites=true&w=majority";
const url = "mongodb://localhost:27017/streamingDB";

const cors = require("cors");

const port = 7689;

const app = express();

const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");

const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
	console.log("connection has been established", socket.id);
});

app.use(express.json());
app.use(cors());

mongoose.connect(url_online).then(() => {
	console.log("connected to database");
});

const db = mongoose.connection;

db.on("open", () => {
	const dbConnect = db.collection("checkers").watch();

	dbConnect.on("change", (change) => {
		console.log(change);
		if (change.operationType === "insert") {
			const file = {
				_id: change.fullDocument._id,
				name: change.fullDocument.name,
				course: change.fullDocument.course,
			};
			io.emit("observer", file);
		}
	});
});

app.use("/", require("./router"));

server.listen(port, () => {
	console.log("listening on port");
});
