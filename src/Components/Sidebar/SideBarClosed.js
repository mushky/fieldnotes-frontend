import React from 'react';

import { Link } from 'react-router-dom';

import HomeRoundedIcon from '@material-ui/icons/HomeRounded';

const SideBarClosed = () => {


	return(
		<div className="sidebar-container-closed">
			<ul className="sidebar-items">

				<li className="sidebar-items-top">
					<HomeRoundedIcon style={{ fontSize: "16px", float: "left", marginRight: "10px", marginTop: "2px"  }}/>
					<Link to="/Notes">Notes</Link>
				</li>

			</ul>
		</div>
	)
}

export default SideBarClosed;