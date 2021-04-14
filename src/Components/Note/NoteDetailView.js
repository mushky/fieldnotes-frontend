import React from 'react';

import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Fab from '@material-ui/core/Fab';

function NoteDetailView(props) {

	function handleClick(e) {
		props.onDelete(props.id);
	}

	return(
		<div>
			<h1>{props.title}</h1>
			<p>{props.content}</p>
			<br></br>
			<pre>{props.category}</pre>
			<pre>{props.tags}</pre>

			<div className="delete-button">
				<Fab>
					<DeleteForeverIcon onClick={handleClick}/>
				</Fab>
			</div>
		</div>

	)
}

export default NoteDetailView;