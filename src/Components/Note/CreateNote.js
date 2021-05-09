import React, {useState, useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';

import { UserContext } from '../../Context/UserContext';

import NoteAddIcon from '@material-ui/icons/NoteAdd';

import Select from 'react-select'

import axios from 'axios';

const CreateNote = (props) => {
	const url = process.env.REACT_APP_API_URL

	const { userValue } = useContext(UserContext);

	const [note, setNote] = useState({
		title: "",
		content: "",
		source: "",
		category: "",
		tags: "",
		userId: userValue[0],
		isResponsive: props.isResponsive
	});

	const [category, setCategory] = useState("");
	const [categories, setCategories] = useState([]);

	

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
					_id: res.data.Note._id, content: res.data.Note.content, 
					title: res.data.Note.title, source: res.data.Note.source, 
					category: res.data.Note.category,tags: res.data.Note.tags,					
					userId: res.data.Note.userId
				}
				setNote(newNote);
				if (props.isResponsive === false) {
					props.addNote(newNote);
				}
			}, (error) => {
				console.log(error);
			}).then(
				setTimeout(() => {
					setNote({ 
						title: "", content: "", category: "", 
						source: "", tags: "", userId: userValue[0] 
					})
					setCategory('');
				},100)
			)
	}
	
	return(
		<div className="view-note-fullscreen">
			<form className="note-form">
				<Link className="back-link-create-note" to="/">
					<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
						<path 
							fill="#FFFFFF" 
							d="M19 11H7.14l3.63-4.36a1 1 0 1 0-1.54-1.28l-5 6a1.19 1.19 0 0 0-.09.15c0 .05 0 .08-.07.13A1 1 0 0 0 4 12a1 1 0 0 0 .07.36c0 .05 0 .08.07.13a1.19 1.19 0 0 0 .09.15l5 6A1 1 0 0 0 10 19a1 1 0 0 0 .64-.23a1 1 0 0 0 .13-1.41L7.14 13H19a1 1 0 0 0 0-2z"/>
					</svg>
					<br></br>
				</Link>
				<input className="note-form-input" name="title" onChange={onHandleChange} value={note.title} placeholder="Note Title" />
				{/* <hr></hr> */}
				{/* <div className="rich-text-editor">
					<RichTextEditor onChange={onHandleChange} name="content" value={note.content}/>
				</div> */}
				<textarea className="note-form-textarea" name="content" onChange={onHandleChange} value={note.content} placeholder="Start typing here..." rows="5" cols="50" />
				<Select className="note-select-button" onChange={handleSelect} options={categories} name="category" value={category}  placeholder="Category"/>
				<input className="note-form-tags" name="source" onChange={onHandleChange} value={note.source} placeholder="Sources" />
				<span>
					<input className="note-form-tags" name="tags" onChange={onHandleChange} value={note.tags} placeholder="Tags" />
					<NoteAddIcon className="note-form-button" style={{ fontSize: 50 }} onClick={onHandleSubmit} />
				</span>

				<br></br>
				<br></br>
				<br></br>
			</form>
		</div>
	)
}

export default CreateNote;