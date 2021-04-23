import React from 'react';

const SideBarClosed = (props) => {
	
	const onHandleToggleSidebar = () => {
		props.onToggleSidebar(props);
	}

	return(
		<div className="sidebar-container-closed">
			<li className="sidebar-items-top" onClick={onHandleToggleSidebar}>
				<svg className="hamburger-icon"
					xmlns="http://www.w3.org/2000/svg" 
					width="1em" height="1em" 
					viewBox="0 0 15 15">
					<g>
					<path 
						fill-rule="evenodd" clip-rule="evenodd" 
						d="M1.5 3a.5.5 0 0 0 0 1h12a.5.5 0 0 0 0-1h-12zM1 7.5a.5.5 0 0 1 .5-.5h12a.5.5 0 0 1 0 1h-12a.5.5 0 0 1-.5-.5zm0 4a.5.5 0 0 1 .5-.5h12a.5.5 0 0 1 0 1h-12a.5.5 0 0 1-.5-.5z" 
						fill="#FFFFFF"/>
					</g>
				</svg>
			</li>

		</div>
	)
}

export default SideBarClosed;