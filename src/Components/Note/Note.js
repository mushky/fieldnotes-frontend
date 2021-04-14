import React from 'react';

const Note = (props) => {

	function handleSelect(e) {
		props.onSelect(props);
	}

	return(
		<div className="note" onClick={handleSelect}>
			<h4>{props.title}</h4>
			<p>{props.content}</p>
			<p>{props.category}</p>
			<p>{props.tags}</p>
		</div>
	)
}

export default Note;	