import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom';

class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: '',
      username: '',
      displayName: '',
      hometown: '',
      bio: '',
      following: [],
      followers: []
    }
  }

  componentDidMount = () => {
    let config = {
      method: "GET",
      headers: {"Content-Type": "application/json",
          "Authorization": localStorage.getItem('token')
        }
    }
    // fetch(`http://localhost:4000/users/${this.props.currentUser}`, config)
    //again, this.props.currentUser worked at first, but on refresh, it's an empty object so I had to user localStorage.
    fetch(`http://localhost:4000/users/${localStorage.id}`, config)
    .then(resp => resp.json())
    .then(data => {
      // console.log('this before debuggger', this)
      // debugger
      // console.log('data after fetch inside profile', data);
      this.setState({
        id: data.id,
        username: data.username,
        displayName: data.display_name,
        hometown: data.hometown,
        bio: data.bio,
        following: data.following,
        followers: data.followers
      })
    })
  }

  render() {
    return (
      <Fragment>
        <div className="user-details">
          <p>
          <h1>{this.state.displayName}</h1>
          <h4>{this.state.hometown}</h4>
          <h4>{this.state.bio}</h4>
          <br></br>
          <br></br>
          <p><NavLink exact to={`/users/${this.state.id}/following`}> {this.state.following.length} Following </NavLink> | <NavLink exact to={`/users/${this.state.id}/followers`}> {this.state.followers.length} Followers</NavLink></p>
          </p>
        </div>
      </Fragment>
    )
  }
}

//this isn't doing anything for me becuase I had to use localStorage to do my fetch
const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser.currentUser,
  }
}

export default connect(mapStateToProps)(Profile)
