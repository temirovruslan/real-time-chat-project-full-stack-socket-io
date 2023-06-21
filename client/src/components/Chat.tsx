import { useEffect, useState } from "react";

const Chat = ({ username, room, socket }: any) => {
	const [currenMessage, setCurrenMessage] = useState("");
	const [listMessage, setListMessage] = useState<any>([]);

	const sendData = async () => {
		if (currenMessage) {
			const message = {
				author: username,
				room: room,
				message: currenMessage,
				time:
					new Date(Date.now()).getHours() +
					":" +
					new Date(Date.now()).getMinutes(),
			};
			await socket.emit("send_message", message);
			setListMessage((list: any) => [...list, message]);
			setCurrenMessage('')
		}
	};

	useEffect(() => {
		socket.on("receive_message", (data: any) => {
			setListMessage((list: any) => [...list, data]);
		});

		// Clean up the event listener when the component unmounts
		return () => {
			socket.off("receive_message");
		};
	}, [socket]);
	return (
		<div>
			<div>
				<p className="text-black">Live Chat</p>
			</div>
			<div>
				{listMessage.map((messageContent: any, i: any) => {
					return (
						<div
							className={
								username === messageContent.author
									? "text-right"
									: "text-left"
							}
							key={i}
						>
							<p>{messageContent.message} </p>
							<p className="text-sm">{messageContent.author} </p>
						</div>
					);
				})}
			</div>
			<div>
				<input
					type="text"
					value={currenMessage}
					placeholder="Hey..."
					onKeyPress={(e: any) => {
						e.key === "Enter" && sendData()
					}}
					onChange={(event) => {
						setCurrenMessage(event.target.value);
					}}

				/>
				<button onClick={sendData}>Send</button>
			</div>
		</div>
	);
};

export default Chat;
