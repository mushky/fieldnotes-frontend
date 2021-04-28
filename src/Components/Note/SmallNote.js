import React from 'react';

import axios from 'axios';

const SmallNote = (props) => {
	const url = `http://localhost:3001/api`

	function handleSelect(e) {
		props.onSelect(props);
		console.log(props);
	}

	function truncate(str) {
		if (!str) return;
		return str.length > 80 ? str.substring(0, 80) + "..." : str;
	}

	const moveOutOfTrash = async () => {
		const res = await axios.put(`${url}/notes/outtrash/${props.id}`)
		alert("Note moved back to notes");
		// setSelectedNote({ 
		// 	id: selectedNote.id, title: selectedNote.title, 
		// 	content: selectedNote.content, link: selectedNote.link, category: selectedNote.category, 
		// 	tags: selectedNote.tags, isTrash: false
		// });
	}

	return(
		<div className="note" onClick={handleSelect}>
			<div className="note-content">
				<h4>{props.title}</h4>
				<p>{truncate(props.content)}</p>
				{ props.isTrash &&
					<p className="out-trash-button" onClick={moveOutOfTrash}>Undo</p>
				}
			</div>
			
			<div className="note-dots">
				<svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
					<path 
						d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2z" 
						fill="#626262"/>
				</svg>
			</div>



		</div>
	)
}

export default SmallNote;	