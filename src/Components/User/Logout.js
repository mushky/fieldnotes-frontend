import React, { useContext } from 'react';
import { UserContext } from '../../Context/UserContext';
import { useHistory } from 'react-router-dom';

const Logout = () => {
  const { setUserValue } = useContext(UserContext);
	const history = useHistory();

	function onHandleSubmit(e) {
		e.preventDefault();
	
		setUserValue([])
		history.push("/login");
	}

	return(
		<div className="login-container">
			<button className="logout-button" onClick={onHandleSubmit}>Logout</button>
		</div>
	)

}

export default Logout;