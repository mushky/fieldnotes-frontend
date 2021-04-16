import React, { useState } from 'react';

import EditNote from '../Note/EditNote';
import LargeNote from '../Note/LargeNote';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';

const NoteDetailView = (props) => {
	const [isEditMode, setIsEditMode] = useState(false);

	function handleEditNote() {
		setIsEditMode(!isEditMode);
	}

	return(
		<div>
			<div className="edit-button">
				<Fab>
					<EditIcon onClick={handleEditNote}/>
				</Fab>
			</div>

			{ !isEditMode && 
				<LargeNote {...props} />
			}

			{ isEditMode && 
				<EditNote {...props}/>
			}
		</div>

	)
}

export default NoteDetailView;