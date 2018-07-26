import React, { Component, Fragment } from 'react';
import NavBar3 from '../components/NavBar3'
import { Card } from 'semantic-ui-react'
import Follower from '../components/Follower'

class FollowersContainer extends Component {
  constructor(props) {
    super(props)

    this.state={
      followers: [],
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
        followers: data.followers,
        displayName: data.display_name
      }, () => console.log('state inside followers container', this.state))
    })
  }

  render() {
    let followerComponents = this.state.followers.map(f => {
      return <Follower history = {this.props.history} key={f.id} id={f.id} name={f.display_name} bio={f.bio} hometown={f.hometown} />
    })
    return (
      <Fragment>
        <NavBar3 />
        <h3>{this.state.displayName}'s Followers</h3>
        <Card.Group centered itemsPerRow={4}>
          {followerComponents.length !==0 ? <Fragment>{followerComponents}</Fragment> : <Fragment><br></br><br></br><h4>{this.state.displayName} doesn't have any followers yet.</h4></Fragment>}
        </Card.Group>
      </Fragment>
    )
  }
}

export default FollowersContainer;
