import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { setAllUsers } from '../actions';
import { NavLink } from 'react-router-dom';

class OtherUserProfile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: ''
    }
  }

  componentDidMount() {
    // let id = this.props.id
    // let config = {
    //   method: "GET",
    //   headers: {"Content-Type": "application/json",
    //       "Authorization": localStorage.getItem('token')
    //     }
    // }
    //
    // fetch(`http://localhost:4000/users/${id}`, config)
    // .then(resp => resp.json())
    // .then(data => {
    //   this.setState({
    //     user: data
    //   }, () => console.log('state on otheruserprofile after settting state', this.state))
    // })
    // console.log('this.props.users inside component did mount', this.props.users)
    // console.log('this.props.id inside component did mount', this.props.id)
    // console.log('finding user inside other user profile', this.props.users.find(u => u.id == this.props.id))
  }

  render() {
    // console.log('props inside other user profile', this.props)
    let user = this.props.users.find(u => u.id == this.props.id)
    console.log('user', user)
    return (
      <Fragment>
        <div className="user-details">
          {user !== undefined ?
          <p>
          <h1>Name: {user.display_name}</h1>
          <h4>Location: {user.hometown}</h4>
          <h4>Bio: {user.bio} </h4>
            <br></br>
            <br></br>
          <p><NavLink exact to={`/users/${this.props.id}/following`}> {user.following.length} Following </NavLink> | <NavLink exact to={`/users/${this.props.id}/followers`}> {user.followers.length} Followers</NavLink></p>
          </p>
          : <h6>Loading...</h6>}
        </div>
      </Fragment>
    )
  }
}

//the reason I'm using currentUser.users is bc that's how I defined it in the combinereducers, even though now it holds current user and all users
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
