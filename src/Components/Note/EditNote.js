import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../Context/UserContext';

import { Hint } from 'react-autocomplete-hint';

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

	const [categories, setCategories] = useState([]);

	const getCategories = async () => {
			const res = await axios.get(`${url}/categories/user/${userValue[0]}`)

			let objectArray = [];
			for (let i = 0; i < res.data.category.length; i++) {
				objectArray.push(res.data.category[i].name)
			}
			setCategories(objectArray);
		
	}

	useEffect(() => {
		getCategories();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[]) 

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

	const moveToTrash = async () => {
		const res = await axios.put(`${url}/notes/intrash/${note.id}`)
		alert("Note moved to trash");
		setNote({ 
			isTrash: true
		});

		props.onTrash(note.id);
	}

	return(
		<div className="view-note-fullscreen">

			<form className="edit-form">
				<input className="note-form-input" name="title" onChange={onHandleChange} value={note.title} placeholder="Title" />
				<textarea className="note-form-textarea" name="content" onChange={onHandleChange} value={note.content} placeholder="Type note here..." rows="5" cols="50" />
				<input className="note-form-tags" name="link" onChange={onHandleChange} value={note.link} placeholder="Link" />

				<Hint className="hint-autocomplete" options={categories} allowTabFill >
					<input className="note-form-categories" name="category" onChange={onHandleChange} value={note.category} placeholder="Category" />
				</Hint>

				<input className="note-form-tags" name="tags" onChange={onHandleChange} value={note.tags} placeholder="Tags" />
				
				<div className="note-form-button">
					<EditRoundedIcon style={{ fontSize: 50 }} onClick={onHandleSubmit} />
				</div>

				<div className="delete-note-button">	
					<p onClick={moveToTrash}>Move to Trash</p>
				</div>

			</form>			

		</div>
	)
}

export default EditNote;