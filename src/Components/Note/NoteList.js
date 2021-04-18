import React, { useState, useEffect, useContext } from 'react';

import { UserContext } from '../../Context/UserContext';

import SmallNote from './SmallNote';
import CreateNote from './CreateNote';
import NoteDetailView from './NoteDetailView';
import SideBar from '../Sidebar/SideBar';

import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';

import axios from "axios";

const NoteList = () => {
	const { userValue } = useContext(UserContext);
	const [notes, setNotes] = useState([]);
	const [loading, setLoading] = useState(false);
	const [editMode, setEditMode] = useState(false);

	// The note currently selected by the user
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

		if (notes.length <= 0) {
			setSelectedNote({
				_id: "0",
				title: "Welcome to Field Notes",
				content: "Login to get started!\n\nClick the + button in the Top Right to create a new Note.\n\nSearch your notes using the search bar.",
				link: "",
				category: "",
				tags: "",
				userId: userValue[0],
			})
		}
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

				note.id = newNote._id
				note.title = newNote.title;
				note.content = newNote.content;
				note.link = newNote.link;
				note.category = newNote.category;
				note.tags = newNote.tags;

				notes[i] = note;

				setSelectedNote(newNote);
				
				return;
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
			
			<SideBar />

			<div className="left-container">

				<div className="fieldwrapper">

					<input className="searchbar-input" 
						name="search" 
						onChange={handleSearchChange} 
						placeholder="Search..." 
					/> 
					
					<AddBoxRoundedIcon className="add-button" style={{ fontSize: 40 }} onClick={toggleEditMode}/>

					<SearchRoundedIcon className="search-button" style={{ fontSize: 40 }} onClick={onSearch}/>

				</div>
				
				{ loading && <h2>Loading...</h2> }

				{ notes.length <= 0 && 
					<SmallNote 
						id={selectedNote.id}
						title={selectedNote.title} 
						content={selectedNote.content}
						link={selectedNote.link}
						category={selectedNote.category}
						tags={selectedNote.tags}
						userId={selectedNote.userId}
						onSelect={selectNote} 
					/>
				}

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