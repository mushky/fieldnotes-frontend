import React from 'react';

import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Fab from '@material-ui/core/Fab';

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
		</div>
	)
}

export default Note;	