import React, { useContext } from 'react';
import { UserContext } from '../../Context/UserContext';

import { Link } from 'react-router-dom';

const SideBarClosed = (props) => {
	const { userValue } = useContext(UserContext);

	const onHandleToggleSidebar = () => {
		props.onToggleSidebar(props);
	}

	return(
		<div className="sidebar-container-closed">
			<div className="sidebar-items-top" onClick={onHandleToggleSidebar}>
			<ul className="sidebar-items">
				<li className="sidebar-items-top" onClick={onHandleToggleSidebar}>
					<svg className="hamburger-icon"
						xmlns="http://www.w3.org/2000/svg" 
						width="2em" height="2em" 
						viewBox="0 0 15 15">
						<g>
						<path 
							fillRule="evenodd" clipRule="evenodd" 
							d="M1.5 3a.5.5 0 0 0 0 1h12a.5.5 0 0 0 0-1h-12zM1 7.5a.5.5 0 0 1 .5-.5h12a.5.5 0 0 1 0 1h-12a.5.5 0 0 1-.5-.5zm0 4a.5.5 0 0 1 .5-.5h12a.5.5 0 0 1 0 1h-12a.5.5 0 0 1-.5-.5z" 
							fill="#FFFFFF"/>
						</g>
					</svg>
				</li>

				<div className="sidebar-responsive-closed">

					<li className="sidebar-items-top">
						<Link to ="/">
							<svg className="svg-sidebar-icon" 
								xmlns="http://www.w3.org/2000/svg" 
								width="2em" height="2em" viewBox="0 0 1200 1200">
								<path d="M600 0C268.629 0 0 268.629 0 600s268.629 600 600 600s600-268.629 600-600S931.371 0 600 0zm0 276.489l292.969 227.71v419.312H691.406V670.386H508.594v253.125H307.031V504.199L600 276.489z" 
								fill="#E0FFFF"/>
							</svg>
						</Link>
					</li>				

					<li className="sidebar-items-top">
						<Link to="/Categories">
							<svg className="svg-sidebar-icon"
								xmlns="http://www.w3.org/2000/svg" 
								width="2em" height="2em" viewBox="0 0 1200 1200">
								<path d="M600 0C268.629 0 0 268.629 0 600s268.629 600 600 600s600-268.629 600-600S931.371 0 600 0zM390.527 312.012h154.468l50.024 64.453H958.3v511.523H241.699V376.465h98.804l50.024-64.453z" 
								fill="#E0FFFF"/>
							</svg>
						</Link>
					</li>	

					<li className="sidebar-items-top">
						<svg className="svg-sidebar-icon"
							xmlns="http://www.w3.org/2000/svg" 
							width="2em" height="2em" viewBox="0 0 1026 962">
							<path d="M1020 400L818 624l29 297q-3 20-19 31.5t-36 7.5L513 841L234 960q-20 4-36-8t-19-31l29-297L6 400q-9-17-2.5-36T27 336l298-64L479 14q14-14 34-14t34 14l154 258l298 64q17 9 23.5 28t-2.5 36z" 
							fill="#E0FFFF"/>
						</svg>
					</li>

					<li className="sidebar-items-top">
						<svg className="svg-sidebar-icon"
							xmlns="http://www.w3.org/2000/svg" 
							width="2em" height="2em" viewBox="0 0 24 24">
							<g fill="none">
								<path fill-rule="evenodd" clip-rule="evenodd" d="M5 1a4 4 0 0 0-4 4v14a4 4 0 0 0 4 4h14a4 4 0 0 0 4-4V5a4 4 0 0 0-4-4H5zm7.316 4.051a1 1 0 0 1 .633 1.265L12.054 9h1.892l1.105-3.316a1 1 0 0 1 1.898.632L16.054 9H19a1 1 0 1 1 0 2h-3.613l-.666 2H17a1 1 0 1 1 0 2h-2.946l-1.105 3.316a1 1 0 0 1-1.898-.632L11.946 15h-1.892L8.95 18.316a1 1 0 1 1-1.898-.632L7.946 15H5a1 1 0 1 1 0-2h3.613l.666-2H7a1 1 0 1 1 0-2h2.946l1.105-3.316a1 1 0 0 1 1.265-.633zM10.721 13l.666-2h1.892l-.666 2H10.72z" 
							fill="#E0FFFF"/>
							</g>
						</svg>
					</li>

					<li className="sidebar-items-top">
						<Link to="/Trash">
							<svg className="svg-sidebar-icon"
								xmlns="http://www.w3.org/2000/svg"
								width="2em" height="2em" 
								viewBox="0 0 1200 1200">
								<path d="M600 0C268.629 0 0 268.629 0 600s268.629 600 600 600s600-268.629 600-600S931.371 0 600 0zm-93.091 224.341h186.182v57.422h217.09v105.688H289.819V281.763h217.09v-57.422zm-183.764 243.53h553.71v507.788h-553.71V467.871z" 
								fill="#E0FFFF"/>
							</svg>					
						</Link>
					</li>

					<hr></hr>

					<li className="sidebar-items-bottom">
						<svg className="svg-sidebar-icon"
							xmlns="http://www.w3.org/2000/svg" 
							width="2em" height="2em" 
							viewBox="0 0 24 24">
							<g fill="none">
								<path d="M11.997 18.532a1 1 0 0 1 .993.883l.007.117v1.456a1 1 0 0 1-1.993.116l-.007-.116v-1.456a1 1 0 0 1 1-1zm6.036-1.932l1.03 1.03a1 1 0 0 1-1.415 1.413l-1.029-1.029a1 1 0 0 1 1.414-1.414zm-10.66 0a1 1 0 0 1 0 1.414l-1.028 1.03a1 1 0 0 1-1.415-1.415l1.03-1.03a1 1 0 0 1 1.414 0zM12.01 6.472a5.525 5.525 0 1 1 0 11.05a5.525 5.525 0 0 1 0-11.05zM11.25 9a.75.75 0 0 0-.743.648l-.007.102v3.004l.007.102a.75.75 0 0 0 .642.641l.101.007h2l.102-.007a.75.75 0 0 0 .641-.641l.007-.102l-.007-.102a.75.75 0 0 0-.641-.641l-.102-.007H12V9.75l-.006-.102A.75.75 0 0 0 11.25 9zm9.727 2.018a1 1 0 0 1 .117 1.993l-.117.007h-1.455a1 1 0 0 1-.117-1.993l.117-.007h1.456zM4.48 10.99a1 1 0 0 1 .117 1.993l-.117.007H3.023a1 1 0 0 1-.116-1.993l.116-.007H4.48zM6.25 4.874l.095.083l1.029 1.03a1 1 0 0 1-1.32 1.497L5.96 7.4L4.93 6.371a1 1 0 0 1 1.32-1.497zm12.813.083a1 1 0 0 1 .083 1.32l-.083.094l-1.03 1.03a1 1 0 0 1-1.497-1.32l.083-.095l1.03-1.03a1 1 0 0 1 1.414 0zM12 2.013a1 1 0 0 1 .993.883l.007.117v1.455a1 1 0 0 1-1.994.117l-.006-.117V3.013a1 1 0 0 1 1-1z" 
								fill="#E0FFFF"/>
							</g>
						</svg>
					</li>

					<li className="sidebar-items-bottom">
						{ userValue.length > 1 && <Link to="/Logout"><svg className="svg-sidebar-icon" xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 8 8"><path d="M3 0v1h4v5H3v1h5V0H3zM2 2L0 3.5L2 5V4h4V3H2V2z" fill="#E0FFFF"/></svg></Link> }
					</li>

					<li className="sidebar-items-bottom">
						<svg className="svg-sidebar-icon"
							xmlns="http://www.w3.org/2000/svg"
							width="2em" height="2em" viewBox="0 0 28 28">
							<g fill="none">
								<path d="M16.693 2.311A12.974 12.974 0 0 0 14.013 2c-.924.01-1.823.115-2.704.311a.923.923 0 0 0-.716.8l-.209 1.877a1.707 1.707 0 0 1-2.371 1.376l-1.72-.757a.92.92 0 0 0-1.043.214a12.059 12.059 0 0 0-2.709 4.667a.924.924 0 0 0 .334 1.017l1.527 1.125a1.701 1.701 0 0 1 0 2.74l-1.527 1.128a.924.924 0 0 0-.334 1.016a12.064 12.064 0 0 0 2.707 4.672a.92.92 0 0 0 1.043.215l1.728-.759a1.694 1.694 0 0 1 1.526.086c.466.27.777.745.838 1.281l.208 1.877a.923.923 0 0 0 .702.796a11.67 11.67 0 0 0 5.413 0a.923.923 0 0 0 .702-.796l.208-1.88a1.693 1.693 0 0 1 2.366-1.37l1.727.759a.92.92 0 0 0 1.043-.215a12.065 12.065 0 0 0 2.707-4.667a.924.924 0 0 0-.334-1.017L23.6 15.37a1.701 1.701 0 0 1-.001-2.74l1.525-1.127a.924.924 0 0 0 .333-1.016a12.057 12.057 0 0 0-2.708-4.667a.92.92 0 0 0-1.043-.214l-1.72.757a1.666 1.666 0 0 1-.68.144a1.701 1.701 0 0 1-1.688-1.518l-.21-1.879a.922.922 0 0 0-.714-.799zM14 18a4 4 0 1 1 0-8a4 4 0 0 1 0 8z" 
								fill="#E0FFFF"/>
							</g>
						</svg>
					</li>

				</div>

				</ul>
			</div>

		</div>
	)
}

export default SideBarClosed;