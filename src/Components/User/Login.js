import React, { useState, useContext } from 'react';

import axios from 'axios';
import { UserContext } from '../../Context/UserContext';

function Login() {
	const {userValue, setUserValue} = useContext(UserContext);

	const [user, setUser] = useState({
		username: "",
		password: ""
	});


	function handleChange(e) {
		const {name,value} = e.target;

		setUser(prevUser => {
			return {
				...prevUser,
				[name]: value
			};
		})
	}

	function onSubmit(e) {
		e.preventDefault();
		
		axios.post('http://localhost:3001/api/users/login',{
			"username": user.username,
			"password": user.password
		}).then((res) => {
			setUserValue([
				res.data.existingUser._id,					// id
				res.data.existingUser.email,				// email
				res.data.existingUser.username,			// username
				res.data.token											// token
			])
			alert("User Authenticated");
		}, (error) => {
			console.log(error);
			alert("Error with authentication " + error);
		})
	}

	return(
		<div className="login-container">
			<form>
				<input onChange={handleChange} value={user.username} name="username" placeholder="username"></input>
				<input onChange={handleChange} value={user.password} name="password" placeholder="********"></input>
				<button onClick={onSubmit}>Submit</button>
			</form>

		</div>
	)

}


export default Login;