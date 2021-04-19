import React from 'react';

import { Link } from 'react-router-dom';

import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import MenuIcon from '@material-ui/icons/Menu';


const SideBarClosed = (props) => {
	
	const onHandleToggleSidebar = () => {
		props.onToggleSidebar(props);
	}

	return(
		<div className="sidebar-container-closed">

				<li className="sidebar-items-top" onClick={onHandleToggleSidebar}>
					<MenuIcon style={{ fontSize: "16px", float: "left", marginRight: "10px", marginTop: "2px"  }}/>
				</li>

		</div>
	)
}

export default SideBarClosed;