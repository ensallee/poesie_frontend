import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { setAllUsers } from '../actions';
import { NavLink } from 'react-router-dom';

class OtherUserProfile extends Component {

  toggleButton(user) {
    if (user.followers.find(u => u.id == localStorage.id)) {
      return <button onClick={() => this.unFollow(this.props.id)} className="follow-button">Unfollow</button>
    } else {
      return <button onClick={() => this.handleFollow(this.props.id)} className="follow-button">Follow</button>
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
      this.props.setAllUsers(data)
    })
  }

  render() {
    let user = this.props.users.find(u => u.id == this.props.id)
    // let image = user.images[user.images.length - 1]
    // let imageUrl;
    // if (image !== undefined) {
    //   imageUrl = image.image.url
    // }
    return (
      <Fragment>
        <div className="user-details">
          {user !== undefined ?
          <p>
          {user.images.length !== 0 ? <img className="profile-image" src={`${user.images[user.images.length -1].image.url}`} /> : <img className="profile-image" src={require("../images/placeholder_avatar.png")}/>}
          <h1>{user.display_name}</h1>
          <h4>{user.hometown}</h4>
          <h4>{user.bio} </h4>
            <br></br>
            <br></br>
          <p><NavLink exact to={`/users/${this.props.id}/following`}> {user.following.length} Following </NavLink> | <NavLink exact to={`/users/${this.props.id}/followers`}> {user.followers.length} Followers</NavLink></p>
          {this.toggleButton(user)}
          </p>
          : <h6>Loading...</h6>}
        </div>
      </Fragment>
    )
  }
}

//the reason I'm using currentUser.users is bc that's how I defined it in the combinereducers (inside reducers/index.js), even though now it holds current user AND all users
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

export default connect(mapStateToProps, mapDispatchToProps)(OtherUserProfile);
