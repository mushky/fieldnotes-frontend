import React, {useState} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import NoteList from './Components/Note/NoteList'
import Login from './Components/User/Login';
import Logout from './Components/User/Logout';
import Footer from './Components/Misc/Footer';

import { UserContext } from './Context/UserContext';

import './App.css';

// TODO: Deployment (Frontend)
// TODO: Deployment (Backend)
// TODO: Pagination
// TODO: Search Bar [DONE]
// TODO: Text Area should be able to read markdown

function App() {
  const [userValue, setUserValue] = useState("");

  return (
    <Router>
      <div className="App">
          <UserContext.Provider value={{ userValue, setUserValue }}>
            <Route path="/" exact component={Login} />
            <Route path="/Notes" exact component={NoteList}/>
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
