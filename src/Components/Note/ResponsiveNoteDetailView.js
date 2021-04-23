import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../Context/UserContext';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ResponsiveNoteDetailView = ({ match }) => {
	const {
    params: { noteId },
  } = match;

	const { userValue } = useContext(UserContext);
	const localUrl = `http://192.168.1.75:3001/api`

	const userId = userValue[0];
	const token = userValue[3];

	const [note, setNote] = useState({
		title: "",
		content: "",
		link: "",
		category: "",
		tags: ""
	})
	const [loading, setLoading] = useState(false);


	const fetchNote = async () => {
		console.log(match);
		setLoading(true);
		const res = await axios.get(`${localUrl}/notes/${noteId}`)
		setNote(res.data.Note)
		setLoading(false);
	}

	useEffect(() => {
		fetchNote();
	},[])

	return(
		<div>
			<Link to="/Notes">
				<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
					<path 
						fill="#FFFFFF" 
						d="M19 11H7.14l3.63-4.36a1 1 0 1 0-1.54-1.28l-5 6a1.19 1.19 0 0 0-.09.15c0 .05 0 .08-.07.13A1 1 0 0 0 4 12a1 1 0 0 0 .07.36c0 .05 0 .08.07.13a1.19 1.19 0 0 0 .09.15l5 6A1 1 0 0 0 10 19a1 1 0 0 0 .64-.23a1 1 0 0 0 .13-1.41L7.14 13H19a1 1 0 0 0 0-2z"/>
				</svg>
				<br></br>
			</Link>
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