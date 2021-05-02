import React from 'react';

const Footer = ({ currentUser }) => {

	return(
		<div className="footer">
			{ (currentUser !== undefined) && 
				<p><span className="footer-login-circle-indicator"></span>Logged in as {currentUser}</p> 
			}
			{ (currentUser === undefined) &&
				<p><span className="footer-logged-out-circle-indicator"></span>Not logged in</p>
			}
		</div>
	)
}

export default Footer