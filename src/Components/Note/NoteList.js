import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../Context/UserContext';

import Note from './Note';
import CreateNote from './CreateNote';
import NoteDetailView from './NoteDetailView';

import axios from "axios";

const NoteList = () => {
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

	const onUpdate = (newNote) => {
		for (let i = 0; i < notes.length; i++) {
			if (notes[i]._id === newNote.id) {
				let note = notes.filter((note) => note.id === newNote.id)

				note.title = newNote.title;
				note.content = newNote.content;
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
		const token = userValue[3];
		const headers = {
			"x-access-token": token
		}
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