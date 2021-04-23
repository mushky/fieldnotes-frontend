import React, { useContext } from 'react';
import { UserContext } from '../../Context/UserContext';

import { Link } from 'react-router-dom';

import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import FolderIcon from '@material-ui/icons/Folder';
import GradeIcon from '@material-ui/icons/Grade';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import DeleteIcon from '@material-ui/icons/Delete';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import FlareIcon from '@material-ui/icons/Flare';

import MenuIcon from '@material-ui/icons/Menu';

const SideBarOpen = (props) => {

	const { userValue } = useContext(UserContext);

	const onHandleToggleSidebar = () => {
		props.onToggleSidebar(props);
	}


	return(
		<div className="sidebar-container">

			<ul className="sidebar-items">

				<li className="sidebar-items-top" onClick={onHandleToggleSidebar}>
					<MenuIcon style={{ fontSize: "16px", float: "left", marginRight: "10px", marginTop: "2px"  }}/>
					<p>Collapse</p>
				</li>

				<br></br>

				<li className="sidebar-items-top">
					<HomeRoundedIcon style={{ fontSize: "16px", float: "left", marginRight: "10px", marginTop: "2px"  }}/>
					<Link to="/Notes">Notes</Link>
				</li>

				<li className="sidebar-items-top">
					<FolderIcon style={{ fontSize: "16px", float: "left", marginRight: "10px", marginTop: "2px"  }}/>
					<Link to="/Categories">Categories</Link>
				</li>

				<li className="sidebar-items-top">
					<GradeIcon style={{ fontSize: "16px", float: "left", marginRight: "10px", marginTop: "2px"  }}/>
					Favorites
				</li>

				<li className="sidebar-items-top">
					<LocalOfferIcon style={{ fontSize: "16px", float: "left", marginRight: "10px", marginTop: "2px"  }}/>
					Tags
				</li>

				<li className="sidebar-items-top">
					<DeleteIcon style={{ fontSize: "16px", float: "left", marginRight: "10px", marginTop: "2px"  }}/>
					Trash
				</li>

				<hr></hr>

				<li className="sidebar-items-bottom">
					<FlareIcon style={{ fontSize: "16px", float: "left", marginRight: "10px", marginTop: "2px"  }}/>
					Light Mode
				</li>

				<li className="sidebar-items-bottom">
					<ExitToAppIcon style={{ fontSize: "16px", float: "left", marginRight: "10px", marginTop: "2px"  }} />
					{ userValue.length > 1 && <Link to="/Logout">Logout</Link> }
					{ userValue.length <= 0 && <Link to="/Login">Login</Link>}
				</li>

				<li className="sidebar-items-bottom">
					<SettingsIcon style={{ fontSize: "16px", float: "left", marginRight: "10px", marginTop: "2px"  }}/>
					Settings
				</li>

			</ul>

		</div>

	)
}

export default SideBarOpen;