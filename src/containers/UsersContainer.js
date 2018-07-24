import React, { Component, Fragment } from 'react';
import NavBar from '../components/NavBar'
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
      }, () => console.log('users inside state', this.state.users))
    })
  }

  render() {
    console.log('props inside userscontainer', this.props)
    let userComponents = this.state.users.map(u => {
      return <User history = {this.props.history} key={u.id} id={u.id} name={u.display_name} bio={u.bio} hometown={u.hometown} />
    })
    return (
      <Fragment>
        <NavBar />
          <Card.Group centered itemsPerRow={4}>
            {userComponents}
          </Card.Group>
      </Fragment>
    )
  }
}

export default UsersContainer;
