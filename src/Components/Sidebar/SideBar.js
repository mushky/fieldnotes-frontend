import React, { useState, useContext } from 'react';
import { UserContext } from '../../Context/UserContext';
import SideBarClosed from './SideBarClosed';

import SideBarOpen from './SideBarOpened';

const SideBar = (props) => {

	const { userValue } = useContext(UserContext);

	const [open, setOpen] = useState(true);

	const onToggleSidebar = () => {
		setOpen(!open);
	}


	return(
		<nav>

			<div>
				{ open && 
					<SideBarOpen onToggleSidebar={onToggleSidebar}/>
				}
				{ !open && 
					<SideBarClosed onToggleSidebar={onToggleSidebar}/>
				}
		</div>

	</nav>
	)
}

export default SideBar;