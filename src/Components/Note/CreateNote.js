import React, {useState, useEffect, useContext} from 'react';
import { UserContext } from '../../Context/UserContext';

import Fab from '@material-ui/core/Fab';
import NoteAddIcon from '@material-ui/icons/NoteAdd';

import Select from 'react-select'

import axios from 'axios';

const CreateNote = (props) => {
	const url = `http://localhost:3001/api`

	const { userValue } = useContext(UserContext);
	const [category, setCategory] = useState("");
	const [categories, setCategories] = useState([]);
	const [note, setNote] = useState({
		title: "",
		content: "",
		link: "",
		category: "",
		tags: "",
		userId: userValue[0]
	});

	useEffect(() => {
		const fetchCategories = async () => {
			const res = await axios.get(`${url}/categories/user/${userValue[0]}`)

			let objectArray = [];
			for (let i = 0; i < res.data.category.length; i++) {
				objectArray.push({'value': res.data.category[i].name, 'label': res.data.category[i].name})
			}

			setCategories(objectArray);
		}

		fetchCategories();
	},[]) // eslint-disable-line react-hooks/exhaustive-deps

	const handleSelect = (selectedOption) => {
    setCategory(selectedOption);
	};

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

		// Adding Selected Category to note
		note.category = category["value"];

		axios.post(`${url}/notes`, note , {headers})
			.then((res) => {
				const newNote = {
					_id: res.data.Note._id,
					content: res.data.Note.content,
					title: res.data.Note.title,
					url: res.data.Note.link,
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
						link: "",
						tags: "",
						userId: userValue[0]
					})
					setCategory('');
				},1000)
			)
	}
	
	return(
		<div>
			<form className="note-form ">

				<input className="note-form-input" name="title" onChange={onHandleChange} value={note.title} placeholder="Title" />
				<textarea className="note-form-textarea" name="content" onChange={onHandleChange} value={note.content} placeholder="Type note here..." rows="5" cols="50" />
				<input className="note-form-input" name="link" onChange={onHandleChange} value={note.link} placeholder="link" />
				<Select className="note-form-select" onChange={handleSelect} options={categories} name="category" value={category}  placeholder="create new categories with the category creator..."/>
				<input className="note-form-input" name="tags" onChange={onHandleChange} value={note.tags} placeholder="Tags" />

				<div className="note-form-button">
					<Fab onClick={onHandleSubmit}>
						<NoteAddIcon />
					</Fab>
				</div>

			</form>
		</div>
	)
}

export default CreateNote;