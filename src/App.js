import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import WritingContainer from './containers/WritingContainer';
import UsersContainer from './containers/UsersContainer'
import './App.css';
import Home from './components/Home';
import RegistrationForm from './components/RegistrationForm';
import LogInForm from './components/LogInForm';
import MyPoems from './components/MyPoems';
import Adapter from './components/Adapter';
import { connect } from 'react-redux';
import { setUser, setAllUsers } from './actions';
import FollowersContainer from './containers/FollowersContainer';
import FollowingContainer from './containers/FollowingContainer';

class App extends Component {

  componentDidMount() {
    if (localStorage.token) {
      this.getUsers()
      this.setUser()
    } else {
      console.log('no token!')
    }
  }

  getUsers() {
    let config = {
      method: 'GET',
      headers: {"Content-Type": "application/json",
                "Authorization": localStorage.getItem('token')
      }
    }

    fetch('http://localhost:4000/users', config)
    .then(resp => resp.json())
    .then(data => {
      this.props.setAllUsers(data)
    })
  }

  setUser() {
    let config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem('token')
      }
    }
    fetch(`http://localhost:4000/users/${localStorage.id}`, config)
    .then(resp => resp.json())
    .then(data => this.props.setUser(data))
  }



  render() {
    return (
      <div className="App">
        <Switch>
        <Route exact path ="/" component={(props) => <Home {...props}/>} />
        <Route exact path="/write" component={(props) => <WritingContainer {...props}/>} />
          { Adapter.isLoggedIn() ?
            <Fragment>
              <Route exact path="/users/:id/poems" component={(props) => <MyPoems {...props} />} />
              <Route exact path="/users/:id/followers" component={(props) => <FollowersContainer {...props} />} />
              <Route exact path="/users/:id/following" component={(props) => <FollowingContainer {...props} />} />
              <Route exact path="/users" component={(props) => <UsersContainer {...props} />} />
            </Fragment>
            :
            <Fragment>
              <Route exact path="/register" component={(props) => <RegistrationForm {...props} />} />
              <Route exact path="/login" component={(props) => <LogInForm {...props} />} />
            </Fragment>
          }
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (userInfo) => dispatch(setUser(userInfo)),
    setAllUsers: (users) => dispatch(setAllUsers(users))
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App));

//from convo with Jon and Garry July 23: create a loading attribute on the store, that defaults to false. when you're ready to set user, first trigger an action that sets loading to true. then, trigger another action that sets the user and once that promise resolves, set loading to false.
