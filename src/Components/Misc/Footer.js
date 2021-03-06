import React from 'react';

import { Link } from 'react-router-dom';

const Footer = ({ currentUser }) => {

	return(
		<div className="footer">
			{ (currentUser !== undefined) && 
				<p><span className="footer-login-circle-indicator"></span>Logged in as {currentUser}</p> 
			}
			{ (currentUser === undefined) &&
				<p><span className="footer-logged-out-circle-indicator"></span>Not logged in - <Link to="/Login">Login here</Link></p>
			}
		</div>
	)
}

export default Footer