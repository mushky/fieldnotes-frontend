import React from 'react';


function Footer() {
	const currentYear = new Date().getFullYear();

	return(
		<div className="footer">
			<footer>
				Copyright ©	{currentYear}

			</footer>
		</div>
	)
}

export default Footer;