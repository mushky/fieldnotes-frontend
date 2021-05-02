import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../Context/UserContext';

import { Link } from 'react-router-dom';

import SmallNote from '../Note/SmallNote';

import axios from 'axios';

const TrashList = () => {
	const [ notes, setNotes ] = useState([]);
	const { userValue } = useContext(UserContext);

	const [ selectedNote, setSelectedNote ] = useState({
		_id: "",
		title: "",
		content: "",
		link: "",
		category: "",
		tags: "",
		userId: userValue[0],
		isTrash: ""
	})
	
	const [ loading, setLoading ] = useState(false);
	
	
	const url = process.env.REACT_APP_API_URL

	const userId = userValue[0];
	const token = userValue[3];

	const headers = {
		"x-access-token": token
	}
  
	const fetchNotes = async () => {
		setLoading(true);
		const res = await axios.get(`${url}/notes/user/${userValue[0]}`)
		setNotes(res.data.Note.filter(note => note.isTrash))
		setLoading(false);
	}

	useEffect(() => {
		fetchNotes();
	},[])

	const selectNote = (noteObject) => {
		setSelectedNote({
			id: noteObject.id, title: noteObject.title, content: noteObject.content,
			link: noteObject.link, category: noteObject.category, tags: noteObject.tags,
			userId: noteObject.userId
		});

		setTimeout(() => {
			fetchNotes();
		},200);
	}

	return(
		<div className="container-trash">
			<h2>Trash List</h2>
			<br></br>
			<Link to="/">Back</Link>
			{ loading && <h1>Loading...</h1> }
			{notes.map((noteItem) => {
				return(
					<div>

						{/* Show on Mobile */}

						<div className="responsive-note-detail-view">
							<SmallNote 
								key={noteItem._id} id={noteItem._id} title={noteItem.title} 
								content={noteItem.content} link={noteItem.link} category={noteItem.category}
								tags={noteItem.tags} userId={noteItem.userId} isTrash={noteItem.isTrash} onSelect={selectNote}
							/>


						</div>

						{/* Show on Desktop */}

						<div className="note-detail-view">
							<SmallNote 
								key={noteItem._id} id={noteItem._id} title={noteItem.title} 
								content={noteItem.content} link={noteItem.link} category={noteItem.category}
								tags={noteItem.tags} userId={noteItem.userId} isTrash={noteItem.isTrash} onSelect={selectNote}
							/>

						</div>

					</div>
				)
			})}
		</div>
	)

}

export default TrashList;