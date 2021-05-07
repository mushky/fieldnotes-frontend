import React from 'react';

import { Link } from 'react-router-dom';

const Footer = ({ currentUser }) => {

	const username = localStorage.getItem("username");

	return(
		<div className="footer">
			{ (username.length > 2) && 
				<p><span className="footer-login-circle-indicator"></span>Logged in as {username}</p> 
			}
			{ (username.length <= 0) &&
				<p><span className="footer-logged-out-circle-indicator"></span><Link to={`/Login`}>Not logged in - <strong>Click to Login</strong></Link></p>
			}
		</div>
	)
}

export default Footer