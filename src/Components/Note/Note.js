import React from 'react';

function Note(props) {

	function handleClick(e) {
		props.onDelete(props.id);
	}

	function handleSelect(e) {
		props.onSelect(props);
	}

	return(
		<div className="note" onClick={handleSelect}>
			<h4>{props.title}</h4>
			<p>{props.content}</p>
			<p>{props.category}</p>
			<p>{props.tags}</p>
			<button className="delete-button" onClick={handleClick}>DELETE</button>
		</div>
	)
}

export default Note;	