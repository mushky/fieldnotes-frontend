import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ResponsiveNoteDetailView = ({ match }) => {
	const {
    params: { noteId },
  } = match;
	const url = `http://localhost:3001/api`

	const localUrl = `http://192.168.1.75:3001/api`

	const [note, setNote] = useState({
		title: "",
		content: "",
		link: "",
		category: "",
		tags: ""
	})
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
			<br></br>
			<p>{note.content}</p>
			<br></br>
			<p>{note.link}</p>
			<br></br>
			<pre>{note.category}</pre>
			<br></br>
			<pre>{note.tags}</pre> 
		</div>
	)

}

export default ResponsiveNoteDetailView;