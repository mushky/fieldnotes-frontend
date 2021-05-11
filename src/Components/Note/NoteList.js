import React, { useState, useEffect, useContext } from 'react';

import { Link } from 'react-router-dom';

import { UserContext } from '../../Context/UserContext';

import SmallNote from './SmallNote';
import CreateNote from './CreateNote';
import NoteDetailView from './NoteDetailView';
import SideBar from '../Sidebar/SideBar';

import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import SkaterMoving from '../../assets/SkaterMoving.gif';

import axios from "axios";

// TODO: Refactor Search section in html
const NoteList = () => {
	const { userValue } = useContext(UserContext);
	const [notes, setNotes] = useState([]);
	const [loading, setLoading] = useState(false);
	const [editMode, setEditMode] = useState(false);
	const [content, setContent] = useState(""); // For Search
	const [selectedNote, setSelectedNote] = useState({ 
		_id: "", title: "", content: "", source: "",
		category: "", tags: "", userId: userValue[0], isTrash: ""
	});

	const welcomeNoteText = `Login to get started!\n\nClick the + button in the Top Right to create a new Note.\n\nSearch your notes using the search bar.\n\nClick the Hamburger Icon in the Top Left for more options.`

	// For API
	const url = process.env.REACT_APP_API_URL

	const userId = userValue[0];
	const token = userValue[3];

	const headers = {
		"x-access-token": token
	}
  
	const fetchNotes = async () => {
		setLoading(true);
		const res = await axios.get(`${url}/notes/user/${userValue[0]}?page=1&size=100`, {headers})
		setNotes(res.data.results.notes.filter(note => !note.isTrash))
		setLoading(false);		
	}

	const fetchNotesBySearch = async () => {
		setLoading(true);
		const res = await axios.get(`${url}/notes/search?userId=${userId}&content=${content}&page=1&size=100`, {headers})
		setNotes(res.data.results.notes.filter(note => !note.isTrash))
		if (res.data.results.notes.length <= 0) {	
			setNotes([{
				title: `Couldn't find any notes with that kind of content.`, 
				content: `Content provided: ${content}`
			}])
		}
		setLoading(false);
	}

	useEffect(() => {
		fetchNotes();
		if (notes.length <= 0 && userId == undefined) {
			setSelectedNote({
				_id: "0", title: "Welcome to Field Notes", content: welcomeNoteText,
				source: "", category: "", tags: "", userId: userValue[0],
			})
		} else {
			setSelectedNote({
				_id: "0", title: "Welcome Back", content: "Get back to it.",
				source: "", category: "", tags: "", userId: userValue[0],
			})
		}
	},[]) // eslint-disable-line react-hooks/exhaustive-deps

	const addNote = (newNote) => {
    setNotes(prevNotes => {
      return [newNote, ...prevNotes]
    })
  }

	const onUpdate = (newNote) => {
		for (let i = 0; i < notes.length; i++) {
			if (notes[i]._id === newNote.id) {
				let note = notes.filter((note) => note.id === newNote.id)

				note.id = newNote._id; note.title = newNote.title; note.content = newNote.content
				note.source = newNote.source; note.category = newNote.category; note.tags = newNote.tags

				notes[i] = note;

				setSelectedNote(newNote)
				
				return;
			}
		}
	}

	const trashNote = (id) => {
		setNotes(prevNotes => {
      return prevNotes.filter((noteItem) => {
        return noteItem._id !== id;
      });
    })
	}

  const deleteNote = (id) => {
		setNotes(prevNotes => {
      return prevNotes.filter((noteItem) => {
        return noteItem._id !== id;
      });
    })
    axios.delete(`${url}/notes/${id}`, { headers })
      .then((res) => {
        console.log(res);
      }, (error) => {
        console.log(error);
      })
		setTimeout(() => {
			setSelectedNote({})
		},10)
  }

	const selectNote = (noteObject) => {
		setSelectedNote({
			id: noteObject.id, title: noteObject.title, content: noteObject.content,
			source: noteObject.source, category: noteObject.category, tags: noteObject.tags,
			userId: noteObject.userId, isTrash: noteObject.isTrash
		});
		setEditMode(false)
	}

	const toggleEditMode = () => {
		setEditMode(!editMode)
	}

	// For Search
	const handleSearchChange = (e) => {
		setContent(e.target.value)
	}

	const onSearch = (e) => {
		e.preventDefault()
		if (content === undefined || content === "") {
			fetchNotes()
		} else {
			fetchNotesBySearch()
		}
	}

	return(
		<div className="container">
			
			<SideBar />
			
			<div className="left-container">
				<div className="search-fieldwrapper">
					<input className="searchbar-input" 
						name="search" 
						onChange={handleSearchChange} 
						placeholder="Search..." 
					/>

					{/* Show on Desktop */}
					<button className="add-button" onClick={toggleEditMode}>+</button>
					{/* Show on Mobile*/}
					<Link to="/AddNote"><button className="add-button-responsive" onClick={toggleEditMode}>+</button></Link>

					<SearchRoundedIcon className="search-button" style={{ fontSize: 40 }} onClick={onSearch}/>

				</div>

				<div className="search-filter-bar">
					<strong>
						<span className="search-filter-bar-text-left">
							Recent
						</span>
					</strong>

					<strong>
						<span className="search-filter-bar-text-right">
							<select className="custom-select">
								<option>Default</option>
								<option>Title</option>
								<option>Category</option>
								<option>Tags</option>
							</select>
							<span className="select-down-chevron">&#9660;</span>

						</span>
					</strong>
				</div>

				{ loading && <h1>Loading...</h1> }


				<div className="notelist">
					{ notes.length <= 0 && 
						<SmallNote 
							id={selectedNote.id} title={selectedNote.title} content={selectedNote.content} 
							source={selectedNote.source} category={selectedNote.category} tags={selectedNote.tags} 
							userId={selectedNote.userId} onSelect={selectNote} 
						/>
					}
					{notes.map((noteItem) => {
						return(
							<div>	
								{/* Show on Mobile */}
								<div className="responsive-note-detail-view">
									<Link to={`/ResponsiveNoteDetailView/${noteItem._id}`}>
										<SmallNote 
											key={noteItem._id} id={noteItem._id} title={noteItem.title} 
											content={noteItem.content} source={noteItem.source} category={noteItem.category}
											tags={noteItem.tags} userId={noteItem.userId} isTrash={noteItem.isTrash} onSelect={selectNote}
										/>
									</Link>
									{ loading && <div className="login-loading"><img className="skater-login-loading" src={SkaterMoving} alt="loading..." /></div> }

								</div>
								
								{/* Show on Desktop */}

								<div className="note-detail-view">
									<SmallNote 
										key={noteItem._id} id={noteItem._id} title={noteItem.title} 
										content={noteItem.content} source={noteItem.source} category={noteItem.category}
										tags={noteItem.tags} userId={noteItem.userId} isTrash={noteItem.isTrash} onSelect={selectNote}
									/>
								</div>

							</div>
						)
					})}
				</div>

			</div>

			<div className="right-container">

				{ editMode && <CreateNote addNote={addNote} isResponsive={false}/> }

				{ !editMode &&
					<NoteDetailView
						className="note-detail" key={selectedNote.id} id={selectedNote.id} title={selectedNote.title} 
						content={selectedNote.content} source={selectedNote.source} category={selectedNote.category} 
						tags={selectedNote.tags} onDelete={deleteNote} onUpdate={onUpdate} onTrash={trashNote}
					/>
				}
			</div>
	
		</div>

	)
}

export default NoteList;