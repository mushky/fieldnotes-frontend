import React, {useState, useEffect} from 'react';

import Header from './Components/Header';
import Footer from './Components/Footer';

import Note from './Components/Note';

import notes from './notes';
import './App.css';


function App() {
  const [notes, setNotes] = useState([]);


  useEffect(() => {
    
  })

  return (
    <div className="App">
      <Header />
        {notes.map(noteItem => {
          return(
          <Note 
            key ={noteItem.key} 
            title={noteItem.title} 
            content={noteItem.content} />
          )
        })}
      <Footer />
    </div>
  );
}

export default App;
