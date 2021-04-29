import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import NoteList from './Components/Note/NoteList'
import CreateNote from './Components/Note/CreateNote';
import ResponsiveNoteDetailView from './Components/Note/ResponsiveNoteDetailView';

import CategoryList from './Components/Categories/CategoryList';
import TrashList from './Components/Trash/TrashList';
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
            <Switch>
              <Route path="/" exact component={NoteList} />
              <Route path="/Categories" exact component={CategoryList} />
              <Route path="/AddNote" exact component={CreateNote} />
              <Route path="/ResponsiveNoteDetailView/:id" exact component={ResponsiveNoteDetailView} />
              <Route path="/Trash" exact component={TrashList} />
              <Route path="/Login" exact component={Login} />
              <Route path="/Logout" exact component={Logout} />
              <Route path="/Footer" exact component={Footer} />
            </Switch>
          </UserContext.Provider>
      </div>
      <Footer currentUser={userValue[2]} />

    </Router>

  );
}

export default App;
