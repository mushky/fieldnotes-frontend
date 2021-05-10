import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import { Hint } from 'react-autocomplete-hint';
import SvgEditIcon from '../SVGIcons/SvgEditIcon';
import SvgBackIcon from '../SVGIcons/SvgBackIcon';

const ResponsiveNoteDetailView = ({ match }) => {
	const {
    params: { id },
	} = match

	const url = process.env.REACT_APP_API_URL
	
	const { userValue } = useContext(UserContext)
	const [loading, setLoading] = useState(false)
	const [categories, setCategories] = useState([]);

	const [isExtraInfo, setIsExtraInfo] = useState(false);
	const [note, setNote] = useState({
		id: id, title: "", content: "",
		source: "", category: "", tags: ""
	})

	const token = userValue[3];
	const headers = {
		"x-access-token": token
	}

	const fetchNote = async () => {
		setLoading(true);
		const res = await axios.get(`${url}/notes/${id}`)
		setNote(res.data.Note)
		setLoading(false)
	}
	const getCategories = async () => {
		const res = await axios.get(`${url}/categories/user/${userValue[0]}`)

		let objectArray = [];
		for (let i = 0; i < res.data.category.length; i++) {
			objectArray.push(res.data.category[i].name)
		}
		setCategories(objectArray);
	
}

	useEffect(() => {
		getCategories()
		fetchNote()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[])

	const moveToTrash = async () => {
		await axios.put(`${url}/notes/intrash/${id}`)
		alert(`Note Moved to trash`);
		setNote({ 
			id: id, title: note.title, 
			content: note.content, source: note.source, category: note.category, 
			tags: note.tags, isTrash: true
		});
	}

	const moveOutOfTrash = async () => {
		await axios.put(`${url}/notes/outtrash/${id}`)
		alert(`Note moved back to notes`);
		setNote({ 
			id: id, title: note.title, 
			content: note.content, source: note.source, category: note.category, 
			tags: note.tags, isTrash: false
		});
	}

	const toggleExtraInfo = () => {
		setIsExtraInfo(!isExtraInfo)
	}

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

		axios.put(`${url}/notes/${id}`, note , {headers})
			.then((res) => {
				const updatedNote = {
					id: id, content: res.data.updateNote.content,
					title: res.data.updateNote.title, source: res.data.updateNote.source,
					category: res.data.updateNote.category, tags: res.data.updateNote.tags,
					userId: res.data.updateNote.userId
				}
				setNote(updatedNote);
			}, (error) => {
				console.log(error);
			}).then(
				alert("Note Updated")
			)
	}

	return(
		<div className="responsive-note-detail-view">
			<Link to="/">
				<SvgBackIcon />
				<br></br>
			</Link>
			{ loading && <h1>Loading...</h1> }

			<form className="edit-form">
				<input className="note-form-input" name="title" onChange={onHandleChange} value={note.title} placeholder="Title" />
				<textarea className="note-form-textarea" name="content" onChange={onHandleChange} value={note.content} placeholder="Type note here..." rows="5" cols="50" />
				
				<input className="note-form-tags" name="source" onChange={onHandleChange} value={note.source} placeholder={note.source} />

				{ !isExtraInfo && 
					<p className="extra-info-button" onClick={toggleExtraInfo}><i>Show Additional Info</i></p>
				}
				{ isExtraInfo && 
					<p className="extra-info-button" onClick={toggleExtraInfo}><i>Hide Additional Info</i></p>
				}

				<br></br><br></br>
				{ isExtraInfo && 
					<div className="extra-info">
						<Hint className="hint-autocomplete" options={categories} allowTabFill >
							<input className="note-form-categories" name="category" onChange={onHandleChange} value={note.category} placeholder="Category" />
						</Hint>

						<input className="note-form-tags" name="tags" onChange={onHandleChange} value={note.tags} placeholder="Tags" />
					</div>				
				}

				<div className="note-form-button" onClick={onHandleSubmit}>
					<SvgEditIcon />
				</div>

				{ !note.isTrash &&
					<p className="delete-note-button" onClick={moveToTrash}>Move to Trash</p>
				}
				{ note.isTrash &&
					<p className="out-trash-button" onClick={moveOutOfTrash}>Undo</p>
				}

			</form>						
		</div>
	)

}

export default ResponsiveNoteDetailView;