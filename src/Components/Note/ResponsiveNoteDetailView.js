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
			<Link to="/Notes">Back</Link>
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