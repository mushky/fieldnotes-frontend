import React, { useState, useContext } from 'react';
import { UserContext } from '../../Context/UserContext';

import EditRoundedIcon from '@material-ui/icons/EditRounded';

import axios from 'axios';

const EditNote = (props) => {
	const url = `http://localhost:3001/api`
	const localUrl = `http://192.168.1.75:3001/api`

	const { userValue } = useContext(UserContext);

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

		axios.put(`${localUrl}/notes/${props.id}`, note , {headers})
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
		<div className="view-note-fullscreen">

			<form className="edit-form">

				<input className="note-form-input" name="title" onChange={onHandleChange} value={note.title} placeholder="Title" />
				<textarea className="note-form-textarea" name="content" onChange={onHandleChange} value={note.content} placeholder="Type note here..." rows="5" cols="50" />
				<input className="note-form-tags" name="link" onChange={onHandleChange} value={note.link} placeholder="Link" />
				<input className="note-form-tags" name="category" onChange={onHandleChange} value={note.category} placeholder="Category" />
				<input className="note-form-tags" name="tags" onChange={onHandleChange} value={note.tags} placeholder="Tags" />
				

				<div className="note-form-button">
					<EditRoundedIcon style={{ fontSize: 50 }} onClick={onHandleSubmit} />
				</div>

				<div className="delete-note-button">	
					<p onClick={handleDelete}>Move to Trash</p>
				</div>

			</form>			

		</div>
	)
}

export default EditNote;