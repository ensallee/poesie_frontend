import React, { Component, Fragment } from 'react';
import NavBar3 from '../components/NavBar3'
import { Card } from 'semantic-ui-react'
import Follower from '../components/Follower'

//I had to use following and followers instead of users for following container and followers container b/c for some reason, the fetch for an individual user doesn't return who that particular user is following and followed by. It also doesn't reflect their images. So, once I get to the individual following and follower components, I do a fetch for that parcticular user so I can retrieve that information.

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
        <div className="users-container">
          <h3>{this.state.displayName} Follows:</h3>
          <br></br>
          <br></br>
          <Card.Group centered itemsPerRow={4}>
            {followerComponents.length !==0 ? <Fragment>{followerComponents}</Fragment> : <Fragment><br></br><br></br><h4>{this.state.displayName} doesn't have any followers yet.</h4></Fragment>}
          </Card.Group>
        </div>
      </Fragment>
    )
  }
}

export default FollowersContainer;
