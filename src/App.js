import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import WritingContainer from './containers/WritingContainer'
import './App.css';
import Home from './components/Home'
import NavBar from './components/NavBar'
import RegistrationForm from './components/RegistrationForm'
import LogInForm from './components/LogInForm'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path ="/" component={(props) => <Home {...props}/>} />
        <Route exact path="/write" component={(props) => <WritingContainer {...props}/>} />
        <Route exact path="/register" component={(props) => <RegistrationForm {...props} />} />
        <Route exact path="/login" component={(props) => <LogInForm {...props} />} />
      </div>
    );
  }
}

export default App;
