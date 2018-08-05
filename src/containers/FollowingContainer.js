import React, { Component, Fragment } from 'react';
import NavBar3 from '../components/NavBar3'
import { Card } from 'semantic-ui-react'
import Following from '../components/Following'

//I had to use following and followers instead of users for following container and followers container b/c for some reason, the fetch for an individual user doesn't return who that particular user is following and followed by. It also doesn't reflect their images. So, once I get to the individual following and follower components, I do a fetch for that parcticular user so I can retrieve that information.

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
      // console.log('data after fetch inside following container', data)
      this.setState({
        following: data.following,
        displayName: data.display_name
      })
    })
  }

  render() {
    let followingComponents = this.state.following.map(f => {
      return <Following history = {this.props.history} key={f.id} id={f.id} name={f.display_name} bio={f.bio} hometown={f.hometown} />
    })
    return (
      <Fragment>
        <NavBar3 />
        <div className="users-container">
          <h3>{this.state.displayName} is Following:</h3>
          <br></br>
          <br></br>
          <Card.Group centered itemsPerRow={4}>
            {followingComponents.length !==0 ? <Fragment>{followingComponents}</Fragment> : <Fragment><br></br><br></br><h4>{this.state.displayName} doesn't follow anyone yet.</h4></Fragment>}
          </Card.Group>
        </div>
      </Fragment>
    )
  }
  }

export default FollowingContainer;
