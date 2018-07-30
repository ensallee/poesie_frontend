import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom';

class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      images: [],
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
        images: data.images,
        id: data.id,
        username: data.username,
        displayName: data.display_name,
        hometown: data.hometown,
        bio: data.bio,
        following: data.following,
        followers: data.followers
      }, () => console.log('images after setting state', this.state.images))
    })
  }

  editProfile = () => {
    this.props.history.push(`/users/${this.state.id}/edit`)
  }

  uploadPhoto = () => {
    this.props.history.push(`/users/${this.state.id}/photo`)
  }

  render() {
    var image = this.state.images[this.state.images.length - 1]
    var image_url;
    console.log('image url', image_url)
    if (image !== undefined) {
      image_url = image.image.url
    }
    console.log('image', image)
    return (
      <Fragment>
        <div className="user-details">
          <p>
          {image_url === undefined ? <img className="profile-image" src={require("../images/placeholder_avatar.png")}/> : <img className="profile-image" src={`${image_url}`} />}
          <h1>{this.state.displayName}</h1>
          <h4>{this.state.hometown}</h4>
          <h4>{this.state.bio}</h4>
          <br></br>
          <br></br>
          <p><NavLink exact to={`/users/${this.state.id}/following`}> {this.state.following.length} Following </NavLink> | <NavLink exact to={`/users/${this.state.id}/followers`}> {this.state.followers.length} Followers</NavLink></p>
          {localStorage.id == this.state.id ? <button className="edit-button" onClick={this.editProfile}>Edit Profile</button> : null}
          {localStorage.id == this.state.id ? <button className="upload-button" onClick={this.uploadPhoto}>Upload Photo</button> : null}
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
