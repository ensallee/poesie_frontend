import React, { Component, Fragment } from 'react';
import NavBar3 from '../components/NavBar3'
import User from '../components/User'
import { Card } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { setAllUsers } from '../actions';

class UsersContainer extends Component {
  handleFollow = (id) => {
    console.log('inside handleFollow', id)

    let body = {
      follower_id: localStorage.id,
      followed_id: id
    }

    let config = {
      method: "POST",
      headers:{"Content-Type": "application/json",
                "Authorization": localStorage.getItem('token')
      },
      body: JSON.stringify(body)
    }

    fetch('http://localhost:4000/relationships', config)
    .then(resp => resp.json())
    .then(data => {
      this.props.setAllUsers(data)
    })
  }

  unFollow = (id) => {
    let body = {
      follower_id: localStorage.id,
      followed_id: id
    }

    let config = {
      method: "DELETE",
      headers:{"Content-Type": "application/json",
                "Authorization": localStorage.getItem('token')
      },
      body: JSON.stringify(body)
    }

    fetch('http://localhost:4000/relationships', config)
    .then(resp => resp.json())
    .then(data => {
      this.props.setAllUsers(data)
    })
  }

  render() {
    let userComponents = this.props.users.map(u => {
      return <User user = {u} history = {this.props.history} unFollow={this.unFollow} handleFollow={this.handleFollow} followers={u.followers} following={u.following} key={u.id} id={u.id} name={u.display_name} bio={u.bio} hometown={u.hometown} />
    })
    return (
      <Fragment>
        <NavBar3 />
        <div className="users-container">
        <h1>All Poets</h1>
          <Card.Group centered itemsPerRow={4}>
            {userComponents}
          </Card.Group>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.currentUser.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setAllUsers: (users) => dispatch(setAllUsers(users))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
