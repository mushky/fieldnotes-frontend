import React, { useState } from 'react';

function Login() {
	const [user, setUser] = useState({
		username: "",
		password: ""
	});

	function handleChange(e) {
		const {name, value} = e.target

		setUser((prevValue) => {
			if (name === "username") {
				return {
					username: prevValue.username,
					password: prevValue.password
				}
			} else if (name === "password") {
				return {
					username: prevValue.username,
					password: prevValue.password
				}
			}
		})
	}

	return(
		<div className="container">
			<form>
				<input onChange={handleChange} value={user.username} name="username" placeholder="username"></input>
				<input onChange={handleChange} value={user.password} name="password" placeholder="********"></input>

				<button>Submit</button>
			</form>

		</div>
	)

}


export default Login;