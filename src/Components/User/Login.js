import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import axios from 'axios';
import { UserContext } from '../../Context/UserContext';

const Login = () => {
	const { setUserValue } = useContext(UserContext);
	const history = useHistory();

	const [user, setUser] = useState({
		username: "",
		password: ""
	});

	const [loading, setLoading] = useState(false);

	if (loading) {
		return <h2>Loading...</h2>
	}
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
		setLoading(true);
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
			setTimeout(() => {
				setLoading(false);
				history.push("/notes");
				
			})
		}, (error) => {
			setLoading(false);
			console.log(error);
			alert("Error with authentication " + error);
		})
	}

	return(
		<div className="login-container">
			<h1>Field Notes</h1>
			<form>
				<input onChange={handleChange} value={user.username} name="username" placeholder="username"></input>
				<input onChange={handleChange} value={user.password} name="password" placeholder="********"></input>
				<button onClick={onSubmit}>Login</button>
			</form>
		</div>
	)

}


export default Login;