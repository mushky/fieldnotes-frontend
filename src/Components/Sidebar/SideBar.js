import React, { useState, useContext } from 'react';
import { UserContext } from '../../Context/UserContext';
import SideBarClosed from './SideBarClosed';

import SideBarOpen from './SideBarOpened';

const SideBar = () => {

	const { userValue } = useContext(UserContext);

	const [open, setOpen] = useState(true);

	const toggleSidebar = () => {
		setOpen(!open);
		console.log(open);
	}

	return(
		<nav onClick={toggleSidebar}>

			<div>
				{ open && 
					<SideBarOpen />
				}
				{ !open && 
					<SideBarClosed />
				}
		</div>

	</nav>
	)
}

export default SideBar;