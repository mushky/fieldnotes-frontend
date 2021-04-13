import React, {useState, useEffect} from 'react';

import Header from './Components/Header';
import Footer from './Components/Footer';

import Note from './Components/Note/Note';
import CreateNote from './Components/Note/CreateNote';
import Login from './Components/User/Login';

import axios from 'axios';
import './App.css';


function App() {
  const [notes, setNotes] = useState([]);
  const [loggedIn] = useState(false);
  
  useEffect(() => {
    axios.get('http://localhost:3001/api/notes/user/606e2747fe1e935eea5603e6')
      .then((res) => {
        setNotes(res.data.Note)
      })
  },[])

  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    })
  }

  function deleteNote(id) {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNmUyNzQ3ZmUxZTkzNWVlYTU2MDNlNiIsImlhdCI6MTYxODI3MTE5NCwiZXhwIjoxNjE4Mjc4Mzk0fQ.iXThB1tZi0Na7B6gJ5q9u6NPC7dY1VC613kUm4E1YMY"

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

  return (
    <div className="App">
      <Header />
      { loggedIn ? <Login /> : <CreateNote onAdd={addNote}/> }
  
      <div>
        {notes.map((noteItem) => {
            return(
            <Note 
              key={noteItem._id} 
              id={noteItem._id}
              title={noteItem.title} 
              content={noteItem.content} 
              onDelete={deleteNote}/>
            )
          })}
      </div>

        
    </div>
  );
}

export default App;
