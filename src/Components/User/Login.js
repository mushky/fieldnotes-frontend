import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import axios from 'axios';
import { UserContext } from '../../Context/UserContext';

import SkaterMoving from '../../assets/SkaterMoving.gif';

const Login = () => {
	const url = `${process.env.REACT_APP_API_URL}/users/login`

	const { userValue, setUserValue } = useContext(UserContext);
	const history = useHistory();

	const [user, setUser] = useState({
		username: "",
		password: ""
	});

	const [loading, setLoading] = useState(false);

	if (loading) {
		return(
			<div className="login-loading">
				<img className="skater-login-loading" src={SkaterMoving} alt="loading..." />
				{/* <h1 className="login-loading">Loading...</h1> */}
			</div>


		)
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
		axios.post(url,{
			"username": user.username,
			"password": user.password
		}).then((res) => {
			setUserValue([
				res.data.existingUser._id,			// id
				res.data.existingUser.email,		// email
				res.data.existingUser.username,	// username
				res.data.token									// token
			])
			setTimeout(() => {
				setLoading(false);
				history.push("/");
			})
		}, (error) => {
			setLoading(false);
			console.log(error);
			alert("Error with authentication " + error);
		})
	}

	return(
		<div className="login-container">
			<p className="login-title">
				Field Notes
			</p>
			<form className>
				<input className="login-form-username" onChange={handleChange} value={user.username} name="username" placeholder="username"></input><br></br>
				<input className="login-form-password" onChange={handleChange} value={user.password} name="password" placeholder="********"></input><br></br>
				<button className="login-button" onClick={onSubmit}>Login</button>
				<p>{userValue}</p>
			</form>

		</div>
	)

}


export default Login;