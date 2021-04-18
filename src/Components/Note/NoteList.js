import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { UserContext } from '../../Context/UserContext';

import SmallNote from './SmallNote';
import CreateNote from './CreateNote';
import NoteDetailView from './NoteDetailView';

import axios from "axios";

const NoteList = () => {
	const { userValue } = useContext(UserContext);

  const [notes, setNotes] = useState([]);
	const [loading, setLoading] = useState(false);
	const [editMode, setEditMode] = useState(true);
	const [selectedNote, setSelectedNote] = useState({
		_id: "",
		title: "",
		content: "",
		link: "",
		category: "",
		tags: "",
		userId: userValue[0]
	});

	// For Search
	const [content, setContent] = useState("");

	// For API
	const url = `http://localhost:3001/api`

	const token = userValue[3];
	const userId = userValue[0];

	const headers = {
		"x-access-token": token
	}
  
	const fetchNotes = async () => {
		setLoading(true);
		const res = await axios.get(`${url}/notes/user/${userValue[0]}`)
		setNotes(res.data.Note)
		setLoading(false);
	}

	const fetchNotesBySearch = async () => {
		setLoading(true);
		const res = await axios.get(`${url}/notes/search?userId=${userId}&content=${content}`, {headers})
		setNotes(res.data.Note)
		setContent();
		setLoading(false);
	}

	useEffect(() => {
		fetchNotes();
	},[]) // eslint-disable-line react-hooks/exhaustive-deps

	function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    })
  }

	const onUpdate = (newNote) => {
		for (let i = 0; i < notes.length; i++) {
			if (notes[i]._id === newNote.id) {
				let note = notes.filter((note) => note.id === newNote.id)

				note.title = newNote.title;
				note.content = newNote.content;
				note.link = newNote.link;
				note.category = newNote.category;
				note.tags = newNote.tags;

				notes[i] = note;

				setTimeout(() => {
					setSelectedNote(newNote);
					return;
				},1000)
			}
		}
	}

  function deleteNote(id) {
		setNotes(prevNotes => {
      return prevNotes.filter((noteItem) => {
        return noteItem._id !== id;
      });
    })
    axios.delete(`http://localhost:3001/api/notes/${id}`, { headers })
      .then((res) => {
        console.log(res);
      }, (error) => {
        console.log(error);
      })
		setTimeout(() => {
			setSelectedNote({})
		},1000)
  }

	function selectNote(noteObject) {
		console.log(noteObject);
		setSelectedNote({
			id: noteObject.id,
			title: noteObject.title,
			content: noteObject.content,
			link: noteObject.link,
			category: noteObject.category,
			tags: noteObject.tags,
			userId: noteObject.userId
		});
		setEditMode(false);
	}

	function toggleEditMode() {
		setEditMode(!editMode);
	}

	// For Search
	function handleSearchChange(e) {
		setContent(e.target.value);	
	}

	const onSearch = (e) => {
		e.preventDefault();
		if (content === undefined || content === "") {
			fetchNotes();
		} else {
			fetchNotesBySearch();
		}
	}

	return(
		<div className="container">
			<div className="sidebar-container">
				<ul>
					<li>Notes</li>
					<li>Categories</li>
					<li>Favorites</li>
					<li>Tags</li>
					<li>Trash</li>
					<hr></hr>
					<li>Light Mode</li>
					<li>
						{ userValue.length > 1 && <Link to="/Logout">Logout</Link> }
						{ userValue.length <= 0 && <Link to="/Login">Login</Link>}
					</li>
					<li>Settings</li>
				</ul>

			</div>
			<div className="left-container">
				<div className="fieldwrapper">
					<input className="searchbar-input" name="search" onChange={handleSearchChange} placeholder="search..." /> <button className="search-button" onClick={onSearch}>Search</button>
				</div>
				
				{ loading && <h2>Loading...</h2> }

				{notes.map((noteItem) => {
					return(
						<SmallNote 
							key={noteItem._id} 
							id={noteItem._id}
							title={noteItem.title} 
							content={noteItem.content}
							link={noteItem.link}
							category={noteItem.category}
							tags={noteItem.tags}
							userId={noteItem.userId}
							onSelect={selectNote} 
						/>
					)
				})}

			</div>

			<div className="right-container">
				<div>
					{ editMode && <button className="toggle-button" onClick={toggleEditMode}>Switch to View Note Mode</button> }
					{ !editMode && <button className="toggle-button" onClick={toggleEditMode}>Switch to Create Note Mode</button> }
				</div>

				{ editMode && <CreateNote onAdd={addNote}/> }

				{ !editMode &&
					<NoteDetailView 
						key={selectedNote.id} 
						id={selectedNote.id}
						title={selectedNote.title} 
						content={selectedNote.content}
						link={selectedNote.link} 
						category={selectedNote.category} 
						tags={selectedNote.tags} 
						onDelete={deleteNote}
						onUpdate={onUpdate}
					/>
				}
			</div>
		</div>
	)
}

export default NoteList;