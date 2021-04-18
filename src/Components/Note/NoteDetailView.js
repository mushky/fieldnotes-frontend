import React, { useEffect, useState } from 'react';

import EditNote from '../Note/EditNote';

const NoteDetailView = (props) => {
	const [isEditMode, setIsEditMode] = useState(false);

	useEffect(() => {
		setIsEditMode(true);
	},[])

	return(
		<div>
			<div className="edit-button">
			</div>

			{ isEditMode && 
				<EditNote {...props}/>
			}
		</div>

	)
}

export default NoteDetailView;