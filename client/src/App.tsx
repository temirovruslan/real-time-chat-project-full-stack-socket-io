import { useEffect, useState } from "react";
// import socketID from "socket.io-client";
import * as io from "socket.io-client";
const socket = io.connect("http://localhost:5000");
import Chat from "./components/Chat.js";
function App() {
	const [name, setName] = useState("");

	const [room, setRoom] = useState("");
	const [showChat, setShowChat] = useState(true);

	const joinRoom = () => {
		if (name !== "" && room !== "") {
			socket.emit("join_room", room);
			setShowChat(() => !showChat);
		}
	};

	return (
		<div className="min-h-screen flex justify-center items-center">
			<div className="text-3xl font-bold text-blue-600">
				{showChat ? (
					<>
						<h3 className=" font-bold text-blue-600">
							Join a Chat
						</h3>
						<input
							type="text"
							placeholder="John..."
							onChange={(event) => {
								setName(event.target.value);
							}}
						/>
						<input
							type="text"
							placeholder="Room..."
							onChange={(event) => {
								setRoom(event.target.value);
							}}
						/>
						<button onClick={joinRoom}>get</button>
					</>
				) : (
					<Chat username={name} room={room} socket={socket} />
				)}
			</div>
		</div>
	);
}

export default App;
