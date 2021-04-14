import React, { useState, useContext } from 'react';
import { UserContext } from '../../Context/UserContext';

import Fab from '@material-ui/core/Fab';
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';

import axios from 'axios';

function EditNote(props) {
	const url = `http://localhost:3001/api`
	const {userValue, setUserValue} = useContext(UserContext);

	const [note, setNote] = useState({
		title: props.title,
		content: props.content,
		category: props.category,
		tags: props.tags,
		userId: userValue[0]
	});
	
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
		axios.put(`${url}/notes/${props.id}`, note , {headers})
			.then((res) => {
				const updatedNote = {
					_id: res.data.updateNote._id,
					content: res.data.updateNote.content,
					title: res.data.updateNote.title,
					category: res.data.updateNote.category,
					tags: res.data.updateNote.tags,
					userId: res.data.updateNote.userId
				}
				setNote(updatedNote);
				props.onUpdate(updatedNote);
			}, (error) => {
				console.log(error);
			}).then(
				setTimeout(() => {
					setNote({
						title: "",
						content: "",
						category: "",
						tags: "",
						userId: userValue[0]
					})
				},1000)

			)
	}

	return(
		<div>
			<h1>Edit Note</h1>
			<form className="edit-form">
				<input className="note-form-input" name="title" onChange={onHandleChange} value={note.title} placeholder="Title" />
				<textarea className="note-form-textarea" name="content" onChange={onHandleChange} value={note.content} placeholder="Type note here..." rows="5" cols="50" />
				<input className="note-form-input" name="category" onChange={onHandleChange} value={note.category} placeholder="Category" />
				<input className="note-form-input" name="tags" onChange={onHandleChange} value={note.tags} placeholder="Tags" />
				
				<div className="note-form-button">
					<Fab onClick={onHandleSubmit}>
						<DynamicFeedIcon />
					</Fab>
				</div>
			</form>			
		</div>
	)
}

export default EditNote;