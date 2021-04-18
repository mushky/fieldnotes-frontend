import React, { useContext } from 'react';
import { UserContext } from '../../Context/UserContext';


import { Link } from 'react-router-dom';

const SideBar = () => {
	const { userValue } = useContext(UserContext);

	return(
		<div className="sidebar-container">
			<ul>
				<li>Notes</li>
				<li>Categories</li>
				<li>Favorites</li>
				<li>Tags</li>
				<li>Trash</li>
				<hr></hr>
				<li>Light Mode</li>
				<li>
					{ userValue.length > 1 && <Link to="/Logout">Logout</Link> }
					{ userValue.length <= 0 && <Link to="/Login">Login</Link>}
				</li>
				<li>Settings</li>
			</ul>
	</div>
	)
}

export default SideBar;