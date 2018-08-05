import React, { Component, Fragment } from 'react';
import NavBar3 from '../components/NavBar3'
import User from '../components/User'
import { Card, Input } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { setAllUsers } from '../actions';

class UsersContainer extends Component {
  constructor(props) {
    super(props)

    this.state={
      seachTerm: "",
      filteredUsers: []
    }
  }
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

  handleSearch = (e) => {
    let searchTerm = e.target.value
    let filteredUsers = this.props.users.filter(u => {
      return u.display_name.toLowerCase().includes(searchTerm.toLowerCase())
    })
    console.log('filteredUsers', filteredUsers)
    this.setState({
      searchTerm: searchTerm,
      filteredUsers: filteredUsers
    }, () => console.log('search Term inside state', this.state.searchTerm))
  }

  render() {
    let userComponents = this.props.users.map(u => {
        return <User user = {u} history = {this.props.history} images={u.images} unFollow={this.unFollow} handleFollow={this.handleFollow} followers={u.followers} following={u.following} key={u.id} id={u.id} name={u.display_name} bio={u.bio} hometown={u.hometown} />
      })
    let filteredUsers = this.state.filteredUsers.map(u => {
        return <User user = {u} history = {this.props.history} images={u.images} unFollow={this.unFollow} handleFollow={this.handleFollow} followers={u.followers} following={u.following} key={u.id} id={u.id} name={u.display_name} bio={u.bio} hometown={u.hometown} />
      })
    return (
      <Fragment>
        <NavBar3 />
        <div className="users-container">
        <h1>All Poets</h1>
          <Input
            icon='users'
            iconPosition='left'
            style={{padding:'6px', margin: '5px'}}
            size='large'
            onChange={this.handleSearch}
            placeholder='Search Poets'
            value={this.state.searchTerm}
            type="text"
          />
          <Card.Group centered itemsPerRow={4}>
            {this.state.filteredUsers.length !== 0 ? <Fragment>{filteredUsers}</Fragment> : <Fragment>{userComponents}</Fragment>}
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
