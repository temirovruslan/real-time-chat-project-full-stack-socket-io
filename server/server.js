import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
const app = express();

// Define the port number to listen on
const port = 5000;
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		// origin: "http://localhost:5173/",
		origin: "*",
		methods: ["GET", "POST"],
	},
});

io.on("connection", (socket) => {
	console.log(`User Connected: ${socket.id}`);

	socket.on("join_room", (data) => {
		socket.join(data);
		console.log(`User with ID: ${socket.id} joined room ${data}`);
	});

	socket.on("send_message", (data) => {
		console.log(data);
		socket.to(data.room).emit("receive_message", data);
	});

	socket.on("disconnect", () => {
		console.log("User Disconnected", socket.id);
	});
});

// Define a route handler for the root URL
app.get("/", (req, res) => {
	res.json({
		message: "Hello",
	});
});

// Start the server
server.listen(port, (err) => {
	if (err) {
		return console.log(err);
	}
	console.log(`Server running at http://localhost:${port}/`);
});
