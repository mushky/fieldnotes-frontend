import React, {useState} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import NoteList from './Components/Note/NoteList'
import CreateNote from './Components/Note/CreateNote';
import CategoryList from './Components/Categories/CategoryList';
import Login from './Components/User/Login';
import Logout from './Components/User/Logout';
import Footer from './Components/Misc/Footer';

import { UserContext } from './Context/UserContext';

import './App.css';

function App() {
  const [userValue, setUserValue] = useState("");

  return (
    <Router>
      <div>
          <UserContext.Provider value={{ userValue, setUserValue }}>
            <Route path="/" exact component={NoteList} />
            <Route path="/Notes" exact component={NoteList}/>
            <Route path="/Categories" exact component={CategoryList} />
            <Route path="/AddNote" exact component={CreateNote} />
            <Route path="/Login" exact component={Login} />
            <Route path="/Logout" exact component={Logout} />
            <Route path="/Footer" exact component={Footer} />
          </UserContext.Provider>
      </div>
      <Footer currentUser={userValue[2]} />

    </Router>

  );
}

export default App;
