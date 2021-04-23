import React, {useState, useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';

import { UserContext } from '../../Context/UserContext';

import NoteAddIcon from '@material-ui/icons/NoteAdd';

import Select from 'react-select'

import axios from 'axios';

import 'draft-js/dist/Draft.css';


const CreateNote = (props) => {
	const url = `http://localhost:3001/api`
	const localUrl = `http://192.168.1.75:3001/api`

	const { userValue } = useContext(UserContext);

	const [note, setNote] = useState({
		title: "",
		content: "",
		link: "",
		category: "",
		tags: "",
		userId: userValue[0]
	});

	const [category, setCategory] = useState("");
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		const fetchCategories = async () => {
			const res = await axios.get(`${localUrl}/categories/user/${userValue[0]}`)

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
					_id: res.data.Note._id, content: res.data.Note.content, title: res.data.Note.title,
					link: res.data.Note.link,category: res.data.Note.category,tags: res.data.Note.tags,					
					userId: res.data.Note.userId
				}
				setNote(newNote);
				props.onAdd(newNote);
			}, (error) => {
				console.log(error);
			}).then(
				setTimeout(() => {
					setNote({ 
						title: "", content: "", category: "", 
						link: "", tags: "", userId: userValue[0] 
					})
					setCategory('');
				},1000)
			)
	}
	
	return(
		<div>
			<form className="note-form">
				<Link className="back-link-create-note" to="/Notes">Back</Link>
				<input className="note-form-input" name="title" onChange={onHandleChange} value={note.title} placeholder="Note Title" />
				<hr></hr>
				<textarea className="note-form-textarea" name="content" onChange={onHandleChange} value={note.content} placeholder="Start typing here..." rows="5" cols="50" />
				<input className="note-form-tags" name="link" onChange={onHandleChange} value={note.link} placeholder="Any Links?" />
				<Select className="note-select-button" onChange={handleSelect} options={categories} name="category" value={category}  placeholder="create new categories with the category creator..."/>
				<input className="note-form-tags" name="tags" onChange={onHandleChange} value={note.tags} placeholder="Tags" />

				<div className="note-form-button">
					<NoteAddIcon style={{ fontSize: 50 }} onClick={onHandleSubmit} />
				</div>

			</form>
		</div>
	)
}

export default CreateNote;