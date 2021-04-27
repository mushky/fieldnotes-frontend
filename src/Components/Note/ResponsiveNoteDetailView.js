import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';

const ResponsiveNoteDetailView = ({ match }) => {
	const {
    params: { noteId },
	} = match;
	const url = `http://localhost:3001/api`

	const localUrl = `http://192.168.1.75:3001/api`

	const [note, setNote] = useState({
		id: match['params']['id'],
		title: "",
		content: "",
		link: "",
		category: "",
		tags: ""
	})

	const { userValue } = useContext(UserContext);

	const [loading, setLoading] = useState(false);

	const fetchNote = async () => {
		setLoading(true);
		const res = await axios.get(`${url}/notes/${match['params']['id']}`)
		setNote(res.data.Note)
		setLoading(false);
	}

	useEffect(() => {
		fetchNote();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[])

	const moveToTrash = async () => {
		const res = await axios.put(`${url}/notes/intrash/${match['params']['id']}`)
		alert("Note moved to trash");
		setNote({ 
			id: match['params']['id'], title: note.title, 
			content: note.content, link: note.link, category: note.category, 
			tags: note.tags, isTrash: true
		});
	}

	const moveOutOfTrash = async () => {
		const res = await axios.put(`${url}/notes/outtrash/${match['params']['id']}`)
		alert("Note moved back to notes");
		setNote({ 
			id: match['params']['id'], title: note.title, 
			content: note.content, link: note.link, category: note.category, 
			tags: note.tags, isTrash: false
		});
	}

	return(
		<div>
			<Link to="/Notes">
				<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
					<path 
						fill="#FFFFFF" 
						d="M19 11H7.14l3.63-4.36a1 1 0 1 0-1.54-1.28l-5 6a1.19 1.19 0 0 0-.09.15c0 .05 0 .08-.07.13A1 1 0 0 0 4 12a1 1 0 0 0 .07.36c0 .05 0 .08.07.13a1.19 1.19 0 0 0 .09.15l5 6A1 1 0 0 0 10 19a1 1 0 0 0 .64-.23a1 1 0 0 0 .13-1.41L7.14 13H19a1 1 0 0 0 0-2z"/>
				</svg>
					<br></br>
			</Link>

			{ loading && <h1>Loading...</h1> }

			<h2>{note.title}</h2>
			{ note.isTrash &&
				<p className="out-trash-button" onClick={moveOutOfTrash}>Undo</p>
			}

			<br></br>

			<p>{note.content}</p>
			<br></br>
			<p>{note.link}</p>
			<br></br>
			<pre>{note.category}</pre>
			<br></br>
			<pre>{note.tags}</pre>
			
			{ !note.isTrash &&
				<p className="delete-note-button" onClick={moveToTrash}>Move to Trash</p>
			}
		</div>
	)

}

export default ResponsiveNoteDetailView;