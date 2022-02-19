import React, { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";

function App() {
	const url = "http://localhost:7689";

	const [user, setUser] = React.useState([]);

	const fetchData = async () => {
		const res = await axios.get(url);
		if (res) {
			setUser(res.data.data);
		}
	};

	const socket = io(url);
	socket.on("observer", (data) => {
		console.log(data);
		setUser([...user, data]);
	});

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className='App'>
			<div>
				<input placeholder='title' />
				<input placeholder='description' />
				<button>Submit</button>
			</div>

			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />

			{user?.map(({ name, course }) => (
				<div>{name}</div>
			))}
		</div>
	);
}

export default App;
