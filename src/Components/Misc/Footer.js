import React from 'react';

const Footer = ({ currentUser }) => {

	return(
		<div className="footer">
			{ currentUser !== undefined && <p>Logged in as {currentUser}</p> }
			{ currentUser === null || currentUser === undefined && <p>Not logged in</p>}
		</div>
	)
}

export default Footer