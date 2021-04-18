import React, { useState, useContext } from 'react';
import { UserContext } from '../../Context/UserContext';

import Fab from '@material-ui/core/Fab';
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import axios from 'axios';

const EditNote = (props) => {
	const url = `http://localhost:3001/api`
	const {userValue, setUserValue} = useContext(UserContext);

	const [note, setNote] = useState({
		id: props.id,
		title: props.title,
		content: props.content,
		link: props.link,
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

	function handleDelete() {
		props.onDelete(note.id);
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
					id: props.id,
					content: res.data.updateNote.content,
					title: res.data.updateNote.title,
					link: res.data.updateNote.link,
					category: res.data.updateNote.category,
					tags: res.data.updateNote.tags,
					userId: res.data.updateNote.userId
				}
				setNote(updatedNote);
				console.log(updatedNote);
				props.onUpdate(updatedNote);
			}, (error) => {
				console.log(error);
			}).then(
				alert("Note Updated")
			)

			
	}

	return(
		<div>
			<form className="edit-form">
				<input className="note-form-input" name="title" onChange={onHandleChange} value={note.title} placeholder="Title" />
				<textarea className="note-form-textarea" name="content" onChange={onHandleChange} value={note.content} placeholder="Type note here..." rows="5" cols="50" />
				<input className="note-form-input" name="link" onChange={onHandleChange} value={note.link} placeholder="Link" />
				<input className="note-form-input" name="category" onChange={onHandleChange} value={note.category} placeholder="Category" />
				<input className="note-form-input" name="tags" onChange={onHandleChange} value={note.tags} placeholder="Tags" />
				
				<div className="note-form-button">
					<Fab onClick={onHandleSubmit}>
						<DynamicFeedIcon />
					</Fab>
				</div>

				<div className="delete-note">
					<Fab onClick={handleDelete}>
						<DeleteForeverIcon />
					</Fab>
				</div>				
			</form>			
		</div>
	)
}

export default EditNote;