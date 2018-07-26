import React, { Component, Fragment } from 'react';
import NavBar3 from '../components/NavBar3'
import User from '../components/User'
import { Card } from 'semantic-ui-react'

class UsersContainer extends Component {
  constructor(props){
    super(props)

    this.state={
      users: []
    }
  }

  componentDidMount() {
    this.getUsers()
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
      this.setState({
        users: data
      }, () => console.log(this.state.users))
    })
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
      this.setState({
        users: data
      })
    })
  }

  unFollow = (id) => {
    console.log('inside unFollow', id)
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
      this.setState({
        users: data
      })
    })
  }

  render() {
    let userComponents = this.state.users.map(u => {
      return <User user = {u} history = {this.props.history} unFollow={this.unFollow} handleFollow={this.handleFollow} followers={u.followers} following={u.following} key={u.id} id={u.id} name={u.display_name} bio={u.bio} hometown={u.hometown} />
    })
    return (
      <Fragment>
        <NavBar3 />
        <h1>All Poets</h1>
          <Card.Group centered itemsPerRow={4}>
            {userComponents}
          </Card.Group>
      </Fragment>
    )
  }
}

export default UsersContainer;
