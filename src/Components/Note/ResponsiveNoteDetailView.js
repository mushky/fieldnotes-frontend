import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';

const ResponsiveNoteDetailView = ({ match }) => {
	const {
    params: { id },
	} = match;

	const url = process.env.REACT_APP_API_URL
	
	const { userValue } = useContext(UserContext);

	const [loading, setLoading] = useState(false);

	const [note, setNote] = useState({
		id: id, title: "", content: "",
		source: "", category: "", tags: ""
	})

	const fetchNote = async () => {
		setLoading(true);
		const res = await axios.get(`${url}/notes/${id}`)
		setNote(res.data.Note)
		setLoading(false);
	}

	useEffect(() => {
		fetchNote();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[])

	const moveToTrash = async () => {
		const res = await axios.put(`${url}/notes/intrash/${id}`)
		alert(`Note Moved to trash`);
		setNote({ 
			id: id, title: note.title, 
			content: note.content, source: note.source, category: note.category, 
			tags: note.tags, isTrash: true
		});
	}

	const moveOutOfTrash = async () => {
		const res = await axios.put(`${url}/notes/outtrash/${id}`)
		alert(`Note moved back to notes`);
		setNote({ 
			id: id, title: note.title, 
			content: note.content, source: note.source, category: note.category, 
			tags: note.tags, isTrash: false
		});
	}

	return(
		<div className="responsive-note-detail-view">
			<Link to="/">
				<svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24">
					<path 
						fill="#FFFFFF" 
						d="M19 11H7.14l3.63-4.36a1 1 0 1 0-1.54-1.28l-5 6a1.19 1.19 0 0 0-.09.15c0 .05 0 .08-.07.13A1 1 0 0 0 4 12a1 1 0 0 0 .07.36c0 .05 0 .08.07.13a1.19 1.19 0 0 0 .09.15l5 6A1 1 0 0 0 10 19a1 1 0 0 0 .64-.23a1 1 0 0 0 .13-1.41L7.14 13H19a1 1 0 0 0 0-2z"/>
				</svg>
					<br></br>
			</Link>

			{ loading && <h1>Loading...</h1> }
			<div className="response-note-detail-view-container">	
				<h2>{note.title}</h2>
				{ note.isTrash &&
					<p className="out-trash-button" onClick={moveOutOfTrash}>Undo</p>
				}

				<br></br>

				<p>{note.content}</p>
				<br></br>
				<p>{note.source}</p>
				<br></br>
				<pre>{note.category}</pre>
				<br></br>
				<pre>{note.tags}</pre>
				
				{ !note.isTrash &&
					<p className="delete-note-button" onClick={moveToTrash}>Move to Trash</p>
				}
			</div>
		</div>
	)

}

export default ResponsiveNoteDetailView;