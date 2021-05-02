import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../Context/UserContext';

import { Hint } from 'react-autocomplete-hint';

import axios from 'axios';

const EditNote = (props) => {

	const url = process.env.REACT_APP_API_URL
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
	const [isExtraInfo, setIsExtraInfo] = useState(false);

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

	const toggleExtraInfo = () => {
		setIsExtraInfo(!isExtraInfo)
	}

	return(
		<div className="view-note-fullscreen">

			<form className="edit-form">
				<input className="note-form-input" name="title" onChange={onHandleChange} value={note.title} placeholder="Title" />
				<textarea className="note-form-textarea" name="content" onChange={onHandleChange} value={note.content} placeholder="Type note here..." rows="5" cols="50" />
				
				
				{ !isExtraInfo && 
					<p className="extra-info-button" onClick={toggleExtraInfo}><i>Show Additional Info</i></p>
				}
				{ isExtraInfo && 
					<p className="extra-info-button" onClick={toggleExtraInfo}><i>Hide Additional Info</i></p>
				}
				<br></br><br></br>
				{ isExtraInfo && 
					<div className="extra-info">
						<input className="note-form-tags" name="link" onChange={onHandleChange} value={note.link} placeholder="Link" />
						<Hint className="hint-autocomplete" options={categories} allowTabFill >
							<input className="note-form-categories" name="category" onChange={onHandleChange} value={note.category} placeholder="Category" />
						</Hint>

						<input className="note-form-tags" name="tags" onChange={onHandleChange} value={note.tags} placeholder="Tags" />
					</div>				
				}

				<div className="note-form-button">
					<svg className="svg-sidebar-icon" onClick={onHandleSubmit}
						xmlns="http://www.w3.org/2000/svg" 
						width="4em" height="4em" 
						viewBox="0 0 24 24">
						<g fill="none">
							<path d="M16.474 5.408l2.118 2.117m-.756-3.982L12.109 9.27a2.118 2.118 0 0 0-.58 1.082L11 13l2.648-.53c.41-.082.786-.283 1.082-.579l5.727-5.727a1.853 1.853 0 1 0-2.621-2.621z" stroke="#01c352" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
							<path d="M19 15v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3" stroke="#01c352" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
						</g>
					</svg>					
				</div>

				<div className="delete-note-button">	
					<p onClick={moveToTrash}><i>Move to Trash</i></p>
				</div>

			</form>			

		</div>
	)
}

export default EditNote;