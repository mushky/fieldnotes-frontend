import React, {useState} from 'react';
import axios from 'axios';

function CreateNote(props) {
  
	const [note, setNote] = useState({
		title: "",
		content: "",
		userId: "606e2747fe1e935eea5603e6"
	});

	function handleChange(e) {
		const {name,value} = e.target;

		setNote(prevNote => {
			return {
				...prevNote,
				[name]: value
			};
		})
	}

	function submitNote(e) {
		e.preventDefault();

		const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNmUyNzQ3ZmUxZTkzNWVlYTU2MDNlNiIsImlhdCI6MTYxODI3MTE5NCwiZXhwIjoxNjE4Mjc4Mzk0fQ.iXThB1tZi0Na7B6gJ5q9u6NPC7dY1VC613kUm4E1YMY"
		const headers = {
			"x-access-token": token
		}

		axios.post('http://localhost:3001/api/notes', note , {headers})
			.then((res) => {
				const newNote = {
					_id: res.data.Note._id,
					content: res.data.Note.content,
					title: res.data.Note.title,
					userId: res.data.Note.userId
				}
				props.onAdd(newNote);
				setNote(newNote);
			}, (error) => {
				console.log(error);
			})
	}
	
	return(
		<div>
			<form className="note-form ">
				<input className="note-form-input" name="title" onChange={handleChange} value={note.title} placeholder="Title" />
				<textarea className="note-form-textarea" name="content" onChange={handleChange} value={note.content} placeholder="Type note here..." rows="5" cols="50" />
				<button className="note-form-button" onClick={submitNote}>Add</button>
			</form>
		</div>
	)
}

export default CreateNote;