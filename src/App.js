import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import NoteList from './Components/Note/NoteList'
import Login from './Components/User/Login';
import Logout from './Components/User/Logout';

import { UserContext } from './Context/UserContext';

import './App.css';

// TODO: LOGIN SHOULD REDIRECT
// TODO: Pagination
// TODO: Search Bar
// TODO: Text Area should be able to read markdown

function App() {
  const [userValue, setUserValue] = useState("");

  return (
    <Router>
      <div className="App">
        <header className="header">
          <Link to="/Notes"><h1 className="titleName">Field Notes</h1></Link>
          <nav>
            <li className="login-logout">
              { userValue.length > 1 && <Link to="/Logout">Logout</Link> }
              { userValue.length <= 0 && <Link to="/Login">Login</Link>}
            </li>
            { userValue.length > 1 && <p className="logged-in">Logged in as: <strong>{ userValue[2] }</strong></p> }
          </nav>
        </header>
          <UserContext.Provider value={{ userValue, setUserValue }}>
            <Route path="/Notes" exact component={NoteList}/>
            <Route path="/Login" exact component={Login} />
            <Route path="/Logout" exact component={Logout} />
          </UserContext.Provider>
      </div>
    </Router>

  );
}

export default App;
