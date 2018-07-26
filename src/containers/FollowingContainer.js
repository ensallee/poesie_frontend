import React, { Component, Fragment } from 'react';
import NavBar3 from '../components/NavBar3'
import User from '../components/User'
import { Card } from 'semantic-ui-react'
import Following from '../components/Following'

class FollowingContainer extends Component {

  constructor(props) {
    super(props)

    this.state={
      following: [],
      displayName: ''
    }
  }

  componentDidMount() {
    let id = this.props.location.pathname.split('/')[2]

    let config = {
      method: 'GET',
      headers: {"Content-Type": "application/json",
                "Authorization": localStorage.getItem('token')
      }
    }

    fetch(`http://localhost:4000/users/${id}`, config)
    .then(resp => resp.json())
    .then(data => {
      console.log('data after fetch', data)
      this.setState({
        following: data.following,
        displayName: data.display_name
      }, () => console.log('state inside followers container', this.state))
    })
  }

  render() {
    let followingComponents = this.state.following.map(f => {
      return <Following history = {this.props.history} key={f.id} id={f.id} name={f.display_name} bio={f.bio} hometown={f.hometown} />
    })
    return (
      <Fragment>
        <NavBar3 />
        <h3>{this.state.displayName}'s Followed</h3>
        <Card.Group centered itemsPerRow={4}>
          {followingComponents}
        </Card.Group>
      </Fragment>
    )
  }
  }

export default FollowingContainer;
