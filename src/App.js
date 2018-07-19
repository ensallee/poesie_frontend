import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import WritingContainer from './containers/WritingContainer'
import './App.css';
import Home from './components/Home'
import NavBar from './components/NavBar'
import RegistrationForm from './components/RegistrationForm'
import LogInForm from './components/LogInForm'
import MyPoems from './components/MyPoems'
import Adapter from './components/Adapter'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path ="/" component={(props) => <Home {...props}/>} />
        <Route exact path="/write" component={(props) => <WritingContainer {...props}/>} />
          { Adapter.isLoggedIn() ?
            <Fragment>
              <Redirect to="/write" />
              <Route exact path="/my_poems" component={(props) => <MyPoems {...props} />} />
            </Fragment>
            :
            <Fragment>
              <Route exact path="/register" component={(props) => <RegistrationForm {...props} />} />
              <Route exact path="/login" component={(props) => <LogInForm {...props} />} />
            </Fragment>
          }
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
