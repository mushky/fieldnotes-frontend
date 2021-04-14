import React, { useState } from 'react';

import EditNote from '../Note/EditNote';
import LargeNote from '../Note/LargeNote';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';

function NoteDetailView(props) {
	const [isEditMode, setIsEditMode] = useState(false);

	function handleEditNote() {
		setIsEditMode(!isEditMode);
	}

	function updateNote(props) {
		props.onUpdate(props);
	}

	return(
		<div>
			<div className="edit-button">
				<Fab>
					<EditIcon onClick={handleEditNote}/>
				</Fab>
			</div>

			{ !isEditMode && 
				<LargeNote id={props.id} title={props.title} content={props.content} category={props.category} tags={props.tags} />
			}

			{ isEditMode && 
				<EditNote id={props.id} title={props.title} content={props.content} category={props.category} tags={props.tags} onUpdate={updateNote}/>
			}
		</div>

	)
}

export default NoteDetailView;