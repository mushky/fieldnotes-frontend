import React from 'react';

function Note(props) {

	function handleClick(e) {
		props.onDelete(props.id);
	}

	return(
		<div className="note">
			<h4>{props.title}</h4>
			<p>{props.content}</p>
			<button className="delete-button" onClick={handleClick}>DELETE</button>
		</div>
	)
}

export default Note;	