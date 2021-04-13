import React, { useState, useEffect, useContext } from 'react';

import Note from './Note';
import CreateNote from './CreateNote';

import axios from "axios";
import { UserContext } from '../../UserContext';

function NoteList() {
	const {userValue, setUserValue} = useContext(UserContext);
  const [notes, setNotes] = useState([]);
	const [editMode, setEditMode] = useState(false);
	const [selectedNote, setSelectedNote] = useState({
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
  }

	function selectNote(noteObject) {
		setSelectedNote({
			id: noteObject._id,
			title: noteObject.title,
			content: noteObject.content,
			category: noteObject.category,
			tags: noteObject.tags,
			userId: noteObject.userId
		});
	}

	function toggleEditMode() {
		setEditMode(!editMode);
		console.log(editMode);
	}

	return(
		<div className="container">
			<div className="leftContainer">				
				{notes.map((noteItem) => {
					return(
					<Note 
						key={noteItem._id} 
						id={noteItem._id}
						title={noteItem.title} 
						content={noteItem.content}
						category={noteItem.category}
						tags={noteItem.tags}
						onSelect={selectNote} 
						onDelete={deleteNote}/>
					)
				})}
			</div>

			<div className="rightContainer">
				<button onClick={toggleEditMode}>Toggle</button>
				{ editMode &&
					<CreateNote onAdd={addNote}/> 
				}
				<hr></hr>
				<h1>{selectedNote.title}</h1>
				<p>{selectedNote.content}</p>
				<br></br>
				<pre>{selectedNote.category}</pre>
				<pre>{selectedNote.tags}</pre>
			</div>
		</div>
	)
}

export default NoteList;