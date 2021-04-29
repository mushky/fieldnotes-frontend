import React, { useState } from 'react';
import SideBarClosed from './SideBarClosed';

import SideBarOpen from './SideBarOpened';

const SideBar = () => {

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