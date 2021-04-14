import React, { useContext } from 'react';
import { UserContext } from '../../Context/UserContext';

function Logout() {
  const {userValue, setUserValue} = useContext(UserContext);

	function onHandleSubmit(e) {
		e.preventDefault();
	
		setUserValue([])
		alert("Logged out");
	}

	return(
		<div>
			<button onClick={onHandleSubmit}>Logout</button>
		</div>
	)

}

export default Logout;