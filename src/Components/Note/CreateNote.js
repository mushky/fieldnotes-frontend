import React, {useState, useContext} from 'react';
import axios from 'axios';
import { UserContext } from '../../UserContext';

function CreateNote(props) {
	const {userValue, setUserValue} = useContext(UserContext);

	const [note, setNote] = useState({
		title: "",
		content: "",
		category: "",
		tags: "",
		userId: userValue[0]
	});

	const url = `http://localhost:3001/api`

	function onHandleChange(e) {
		const {name,value} = e.target;

		setNote(prevNote => {
			return {
				...prevNote,
				[name]: value
			};
		})
	}

	function onHandleSubmit(e) {
		e.preventDefault();
		const token = userValue[3];
		const headers = {
			"x-access-token": token
		}

		axios.post(`${url}/notes`, note , {headers})
			.then((res) => {
				console.log(res);
				const newNote = {
					_id: res.data.Note._id,
					content: res.data.Note.content,
					title: res.data.Note.title,
					category: res.data.Note.category,
					tags: res.data.Note.tags,
					userId: res.data.Note.userId
				}
				setNote(newNote);
				props.onAdd(newNote);
			}, (error) => {
				console.log(error);
			}).then(
				setTimeout(() => {
					setNote({
						title: "",
						content: "",
						category: "",
						tags: "",
						userId: userValue[3]
					})
				},1000)

			)
	}
	
	return(
		<div>
			<form className="note-form ">
				<input className="note-form-input" name="title" onChange={onHandleChange} value={note.title} placeholder="Title" />
				<textarea className="note-form-textarea" name="content" onChange={onHandleChange} value={note.content} placeholder="Type note here..." rows="5" cols="50" />
				<input className="note-form-input" name="category" onChange={onHandleChange} value={note.category} placeholder="Category" />
				<input className="note-form-input" name="tags" onChange={onHandleChange} value={note.tags} placeholder="Tags" />

				<button className="note-form-button" onClick={onHandleSubmit}>Add</button>
			</form>
		</div>
	)
}

export default CreateNote;