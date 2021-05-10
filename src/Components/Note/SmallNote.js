import React from 'react';

import axios from 'axios';
import SvgThreeVerticalDotsIcon from '../SVGIcons/SvgThreeVerticalDotsIcon';

const SmallNote = (props) => {
	const url = process.env.REACT_APP_API_URL

	function handleSelect(e) {
		props.onSelect(props)
	}

	function truncate(str) {
		if (!str) return;
		return str.length > 25 ? str.substring(0, 25) + "..." : str
	}

	const moveOutOfTrash = async () => {
		alert("Moving note back to notes")
		await axios.put(`${url}/notes/outtrash/${props.id}`)
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
			
			<div className="note-dots" onClick={()=> {alert("dots")}}>
				<SvgThreeVerticalDotsIcon />
			</div>
		</div>
	)
}

export default SmallNote;	