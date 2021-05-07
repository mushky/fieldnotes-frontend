import React from 'react';
import { useHistory } from 'react-router-dom';

const Logout = () => {
	const history = useHistory();

	function onHandleSubmit(e) {
		e.preventDefault();
	
		localStorage.setItem('id', "")
		localStorage.setItem('email', "");
		localStorage.setItem('username', "");
		localStorage.setItem('token', "");

		history.push("/login");
	}

	return(
		<div className="login-container">
			<button className="logout-button" onClick={onHandleSubmit}>Logout</button>
		</div>
	)

}

export default Logout;