import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../UserContext';

import Note from './Note';
import CreateNote from './CreateNote';
import NoteDetailView from './NoteDetailView';

import axios from "axios";

function NoteList() {
	const {userValue, setUserValue} = useContext(UserContext);

  const [notes, setNotes] = useState([]);
	const [editMode, setEditMode] = useState(true);
	const [selectedNote, setSelectedNote] = useState({
		_id: "",
		title: "",
		content: "",
		category: "",
		tags: "",
		userId: userValue[0]
	});

	const url = `http://localhost:3001/api`
  
	useEffect(() => {
		axios.get(`${url}/notes/user/${userValue[0]}`)
			.then((res) => {
				console.log(res);
				setNotes(res.data.Note)
			})
	},[])

	function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    })
  }

  function deleteNote(id) {
		const token = userValue[3];
		const headers = {
			"x-access-token": token
		}
		console.log(id);
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
		setSelectedNote({
			id: noteObject.id,
			title: noteObject.title,
			content: noteObject.content,
			category: noteObject.category,
			tags: noteObject.tags,
			userId: noteObject.userId
		});
		console.log(selectedNote);
	}

	function toggleEditMode() {
		setEditMode(!editMode);
	}

	return(
		<div className="container">
			<div className="leftContainer">
				<button className="note-list-button">Note List</button>				
				{notes.map((noteItem) => {
					return(
					<Note 
						key={noteItem._id} 
						id={noteItem._id}
						title={noteItem.title} 
						content={noteItem.content}
						category={noteItem.category}
						tags={noteItem.tags}
						userId={noteItem.userId}
						onSelect={selectNote} 
					/>
					)
				})}
			</div>

			<div className="rightContainer">
				<div>
					<button className="toggle-button" onClick={toggleEditMode}>Toggle</button>
				</div>

				{ editMode &&
					<CreateNote onAdd={addNote}/> 
				}
				<NoteDetailView 
					key={selectedNote.id} 
					id={selectedNote.id}
					title={selectedNote.title} 
					content={selectedNote.content} 
					category={selectedNote.category} 
					tags={selectedNote.tags} 
					onDelete={deleteNote}
				/>
			</div>
		</div>
	)
}

export default NoteList;